<template>
  <div class="home">
    <header class="header">
      <div class="methodsContent">
        <el-select v-model="methods" placeholder="请选择" @change="handelMethods">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="urlContent">
        <el-input v-model="APIurl" placeholder="输入接口地址 例如: http://localhost:3000" @input="handelURL"></el-input>
      </div>
      <div class="sendContent">
        <el-button type="primary" @click="handelClick">send</el-button>
      </div>
    </header>
    <!-- 配置项 -->
    <div class="configContainer">
      <Request
        ref="upFile"
        :IFGET="IFGET"
        :clearFile="clearFile"
        :paramsData="getParams" 
        @paramTableCallBack="paramTableCallBack"
        @headersTableCallBack="headersTableCallBack"
        @bodyTableCallBack="bodyTableCallBack"></Request>
    </div>
    <!-- response -->
    <div class="">
      <Response :responseData="responseData"></Response>
    </div>
    



  </div>
</template>

<script>
import Request from "../components/request.vue"
import Response from "../components/response.vue"
export default {
  name: 'HomeView',
  components:{Request,Response},
  data(){
    return {
      IFGET:false,
      APIurl:"",
      methods:"GET",
      header:[],
      oldToken:null,
      options:[
        {
          value:"POST"
        },
        {
          value:"GET"
        }
      ],
      getParams:{},
      responseData:{},
      bodyTable:{},
      clearFile:{}
    }
  },
  methods:{
    handelMethods(){
      this.IFGET = !this.IFGET
    },
    handelURL(){
      let  urlObj = ""
      try {
        urlObj = new URL(this.APIurl);
      } catch (err) {
        return
      }
      const urlSearchParams = urlObj.searchParams;
      const paramObj = Object.fromEntries(urlSearchParams);
      let paramsArr = []
      if(JSON.stringify(paramObj) !== '{}'){
        for(let key in paramObj){
          paramsArr.push({
            key:key,
            value:paramObj[key]
          })
        }
        this.getParams = paramsArr
      }

    },
    // 回调的URL
    paramTableCallBack(data){
      let index = this.APIurl.indexOf("?")
      let apiUrl = "";
      if(index !== -1){
        apiUrl = this.APIurl.substring(0,index)
      }else{
        apiUrl = this.APIurl
      }
      let urlParams = data.map((item,index)=>{
        if(item.paramsKey !== ""){
          if(index === 0){
            return `?${item.paramsKey}=${item.paramsValue}`
          }else{
            return `&${item.paramsKey}=${item.paramsValue}`
          }
        }else{return ""}
      })
      this.APIurl = apiUrl+urlParams.join("")
    },
    // 回调的header
    headersTableCallBack(data){
      this.header = data
    },
    // 回调的body
    bodyTableCallBack(data){
      this.bodyTable = data
    },
    // 验证url格式 添加协议
    addHttpToUrl(url) {
      const regex = /^(http:\/\/|https:\/\/)/i;
      if (!regex.test(url)) {
        url = 'http://' + url;
      }
      return url;
    },
    // 接口提交
    handelClick(){
      let header = this.formatHeader(this.header)
      let cancelToken = this.$axios.CancelToken
      let source = cancelToken.source();
      let token = source.token;
      let {
          contentType,
          // fileSwitch,
          bodyData
        } = this.formatJson()
      // if(fileSwitch){
      //   this.upFileFun()
      //   return
      // }
      if(this.oldToken){
        source.cancel()
      }else{
        this.oldToken = token
        this.$axios({
          cancelToken:token,
          method:this.methods,
          data:this.methods === "POST"?bodyData:"",
          headers:{
            "Content-Type":this.methods === "POST"?contentType:"",
            "realUrl":this.addHttpToUrl(this.APIurl),
            ...header,
          },
          url:this.methods === "GET"?"/get":"/post",
        }).then((response)=>{
          this.oldToken = null;
          this.responseData = response;
        }).catch((err)=>{
            console.log(err);
            this.oldToken = null;
            if(err.message === "canceled"){return}
            if(err.response){
              this.responseData = err.response;
              return
            }
            err.response = {
              status:"未知错误",
              statusText:err.message,
              data:err.stack
            }
            this.responseData = err.response;
        })
      }
    },

    //文件上传
    upFileFun(){
      let header = this.formatHeader(this.header)
      let cancelToken = this.$axios.CancelToken
      let source = cancelToken.source();
      let token = source.token;
      this.$refs['upFile'].uploadSubmit()
      if(this.oldToken){
        source.cancel()
      }else{
        let {
          contentType,
          bodyData
        } = this.formatJson()
        for(let key in bodyData){
          if(this.bodyTable.fileFormData.has(key)){
            this.bodyTable.fileFormData.set(key,bodyData[key])
          }else{
            this.bodyTable.fileFormData.append(key,bodyData[key])
          }
        }
        this.oldToken = token
        this.$axios({
          cancelToken:token,
          method:this.methods,
          data:this.bodyTable.fileFormData,
          headers:{
            "Content-Type":contentType,
            ...header,
          },
          url:this.APIurl,
        }).then((response)=>{
          this.oldToken = null;
          this.responseData = response;
          this.clearFile = response
        }).catch((err)=>{
          this.oldToken = null;
          if(err.message === "canceled"){return}
          if(err.response){
            this.responseData = err.response
            this.clearFile = err.response
            return
          }
          err.response = {
            status:"未知错误",
            statusText:err.message,
            data:err.stack
          }
          this.responseData = err.response
          this.clearFile = err.response
        })
      }
    },

    // 格式化header 
    formatHeader(headerData){
      let header = {}
      headerData.forEach((item)=>{
        if(!item.paramsKey){return}
        header[item.paramsKey] = item.paramsValue
      })
      return header
    },

    // 格式化post表单上传
    formatJson(){
      let data = this.bodyTable.data;
      let contentType = `application/${this.bodyTable.contentType==="form-data"?'x-www-form-urlencoded':this.bodyTable.contentType};charset=utf-8`
      let fileSwitch = this.bodyTable.fileSwitch
      let bodyData = {}
      data && data.forEach((item)=>{
        if(!item.paramsKey){return}
        bodyData[item.paramsKey] = item.paramsValue
      })
      return {
        contentType,
        fileSwitch,
        bodyData
      }
    }
    

  }
}
</script>

<style scoped>
  .home{
    padding:4px
  }
  .header{
    display: flex;
  }
  .methodsContent{
    width: 15%;
  }
  
  .urlContent{
    width: 65%;
  }
  .sendContent{
    width: 20%;
  }
  .sendContent:deep(.el-button){
    width: 100%;
  }
  .methodsContent:deep(.el-input__inner) ,
  .sendContent:deep(.el-button){
    border-radius: 0px;
  }

  .configContainer{
    margin-top:10px;
  }
  .configContainer:deep(.el-tabs--border-card){
    box-shadow:none
  }
</style>
