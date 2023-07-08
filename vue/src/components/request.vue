<!--  -->
<template>
  <div class="getContainer">
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="Params" name="Params">
        <el-table
          height='200'
          :data="paramsTable"
          style="width: 100%">
          <el-table-column
            label="KEY"
            align="center"
            width="180">
            <template slot-scope="props">
              <el-input 
                @input="handelChange('paramsTable',props.row,props.$index)"
                size="mini"
                v-model="props.row.paramsKey" 
                placeholder=""></el-input>
            </template>
          </el-table-column>
          <el-table-column
            key="paramsTable2"
            label="VALUE"
            align="center"
            width="250">
            <template slot-scope="props">
              <el-input 
                @input="handelChange('paramsTable',props.row,props.$index)"
                size="mini"
                v-model="props.row.paramsValue" 
                placeholder=""></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label=""
            align="center"
            >
            <template slot-scope="props">
              <el-button size="mini" round @click="handelDle('paramsTable',props.row,props.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="Headers" name="Headers">
        <el-table
          height='200'
          key="getHeader"
          :data="headersTable"
          style="width: 100%">
          <el-table-column
            key="getTable1"
            label="KEY"
            align="center"
            width="180">
            <template slot-scope="props">
              <el-input 
                @input="handelChange('headersTable',props.row,props.$index)"
                size="mini"
                v-model="props.row.paramsKey" 
                placeholder=""></el-input>
            </template>
          </el-table-column>
          <el-table-column
            key="getTable2"
            label="VALUE"
            align="center"
            width="250">
            <template slot-scope="props">
              <el-input 
                @input="handelChange('headersTable',props.row,props.$index)"
                size="mini"
                v-model="props.row.paramsValue" 
                placeholder=""></el-input>
            </template>
          </el-table-column>
          <el-table-column
            key="getTable3"
            label=""
            align="center"
            width="">
            <template slot-scope="props">
              <el-button size="mini" round @click="handelDle('headersTable',props.row,props.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="Body" name="Body" v-if="IFGET">
        <div class="contentTypeContent">
          <el-radio-group v-model="contentType" @change="handelContentType">
            <el-radio label="json">json</el-radio>
            <el-radio label="form-data">form-data</el-radio>
            <el-radio label="x-www-form-urlencoded">x-www-form-urlencoded</el-radio>
          </el-radio-group>
        </div>
        <el-table
          height='200'
          key="getHeader"
          :data="bodyTable"
          style="width: 100%">
          <el-table-column
            label="KEY"
            align="center"
            width="180">
            <template slot-scope="props">
              <el-input 
                @input="handelChange('bodyTable',props.row,props.$index)"
                size="mini"
                v-model="props.row.paramsKey" 
                placeholder=""></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="VALUE"
            align="center"
            width="250">
            <template slot-scope="props">
              <el-input 
                @input="handelChange('bodyTable',props.row,props.$index)"
                size="mini"
                v-model="props.row.paramsValue" 
                placeholder=""></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label=""
            align="center"
            width="">
            <template slot-scope="props">
              <el-button size="mini" round @click="handelDle('bodyTable',props.row,props.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 上传文件 -->
        <div class="fileTitle" v-if="isFormData">是否上传文件</div>
        <div class="fileContainer" v-if="isFormData">
          <div>
            <el-switch
              size="mini"
              @change="handelSwitch"
              v-model="fileSwitch"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </div>
          <div class="fileNameContent">
            <el-input 
              :disabled="!fileSwitch"
              size="mini"
              v-model="fileName" 
              placeholder=""></el-input>
          </div>
          <div>
            <el-upload
              class="upload-demo"
              ref="uploadFile"
              :http-request="uploadFile"
              action="https://jsonplaceholder.typicode.com/posts/"
              :auto-upload="false">
              <el-button slot="trigger" size="mini" type="primary" :disabled="!fileSwitch">选取文件</el-button>
            </el-upload>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>


  </div>
</template>

<script>
export default {
  name:"getComponent",
  props:{
    paramsData:{
      default:()=>{
        return []
      }
    },
    IFGET:{
      type:Boolean,
      default:false
    },
    clearFile:{
      default:()=>{
        return {}
      }
    }
  },
  data () {
    return {
      contentType:'json',
      isFormData:false,
      fileSwitch:false,
      activeName:"Params",
      paramsTable:[
        {
          paramsKey:"",
          paramsValue:""
        }
      ],
      headersTable:[
        {
          paramsKey:"",
          paramsValue:"",
        }
      ],
      bodyTable:[
        {
          paramsKey:"",
          paramsValue:"",
        }
      ],
      // 文件参数
      fileName:"",
      fileFormData:new FormData()
    };
  },
  
  watch:{
    paramsData(newValue){
      newValue.forEach((item,index)=>{
        if(this.paramsTable.length-1 < index){
          this.paramsTable.push({
            paramsKey:"",
            paramsValue:"",
          })
        }
        this.$set(this.paramsTable[index],'paramsKey',item.key)
        this.$set(this.paramsTable[index],'paramsValue',item.value)
      })
    },
    clearFile(){
      this.fileFormData = new FormData()
      this.$refs.uploadFile.clearFiles()
    },
    IFGET(newValue){
      if(!newValue){
        this.activeName = this.activeName === "Body"?"Params":this.activeName;
      }
    }
  },

  components:{},

  computed:{},

  mounted(){},

  methods:{
    // 输入框创建
    handelChange(dataName,row,index){
      if(this[dataName].length-1 === index){
        this[dataName].push({
          paramsKey:"",
          paramsValue:""
        })
      }
      if(dataName === "paramsTable"){
        this.$emit("paramTableCallBack",this[dataName])
      }
      if(dataName === "headersTable"){
        this.$emit("headersTableCallBack",this[dataName])
      }
      if(dataName === "bodyTable"){
        this.$emit("bodyTableCallBack",{
          data:this[dataName],
          contentType:this.contentType,
          fileSwitch:this.fileSwitch
        })
      }
    },
    // 输入框删除
    handelDle(dataName,row,index){
      console.log("index",index)
      if(index > 0){
        this[dataName].splice(index,1)
      }else if(index === 0){
        this[dataName][0].paramsKey = "";
        this[dataName][0].paramsValue = "";
      }
      if(dataName === "paramsTable"){
        this.$emit("paramTableCallBack",this[dataName])
      }
      if(dataName === "headersTable"){
        this.$emit("headersTableCallBack",this[dataName])
      }
      if(dataName === "bodyTable"){
        this.$emit("bodyTableCallBack",{
          data:this[dataName],
          contentType:this.contentType,
          fileSwitch:this.fileSwitch
        })
      }
    },
    // 监听post请求格式
    handelContentType(){
      console.log("post文件格式",this.contentType)
      if(this.contentType === "form-data"){
        this.isFormData = true
      }else{
        this.isFormData = false
        this.fileSwitch = false
      }
      this.$emit("bodyTableCallBack",{
        data:this.bodyTable,
        contentType:this.contentType,
        fileSwitch:this.fileSwitch
      })
    },
    // 监听文件上传开关
    handelSwitch(){
      this.$emit("bodyTableCallBack",{
        data:this.bodyTable,
        contentType:this.contentType,
        fileSwitch:this.fileSwitch
      })
    },
    // 监听文件变化
    uploadFile(file){
      this.fileFormData = new FormData()
      this.fileFormData.append(this.fileName || "file",file.file)
      this.$emit("bodyTableCallBack",{
        data:this.bodyTable,
        contentType:this.contentType,
        fileSwitch:this.fileSwitch,
        fileFormData:this.fileFormData
      })
    },
    uploadSubmit(){
      this.$refs.uploadFile.submit()
    }


  }
}

</script>

<style scoped>
.getContainer:deep(.el-tabs__content){
  padding-top:0px
}
.contentTypeContent{
  margin-top: 6px;
}
.fileTitle{
  margin-top: 10px;
  font-size: 12px;
}
.fileContainer{
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.fileContainer>div{
  margin-right: 10px;
}
</style>