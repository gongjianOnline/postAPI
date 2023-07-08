<!--  -->
<template>
  <div class="responseContainer">
    <div class="title">
      <div>Response</div>
      <div v-show="JSON.stringify(jsonData) !== '{}'">
        <!-- <span>stateCode</span> -->
        <span class="state stateSuccess" :class="responseData.status==200?'stateSuccess':'stateError'"></span>
        <span class="stateCode stateCodeSuccess" :class="responseData.status==200?'stateCodeSuccess':'stateCodeError'">{{responseData.status}} {{responseData.statusText}}</span>
      </div>
    </div>
    <div class="responseWrapper" v-show="JSON.stringify(jsonData) !== '{}'">
      <JsonViewer :value="jsonData" :expand-depth="5"></JsonViewer>
    </div>
  </div>
</template>

<script>
export default {
  name:'responseComponent',
  data () {
    return {
      jsonData:{}
    };
  },

  props:{
    responseData:{
      type:Object,
    }
  },

  watch:{
    responseData(newVal){
      console.log(newVal)
      this.jsonData = newVal.data
    }
  },

  components:{
  },

  computed:{},

  mounted(){},

  methods:{}
}

</script>
<style scoped>
.responseContainer{
  width: 100%;
  height: 250px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.title{
  font-size: 14px;
  padding-bottom: 4px;
  display: flex;
}
.title>div:nth-child(1),
.title>div:nth-child(2){
  font-size: 14px;
  font-weight: 600;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.state{
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  margin-left: 10px;
}
.stateSuccess{
  background:#67C23A
}
.stateError{
  background:#F56C6C
}
.stateCode{
  display: inline-block;
  margin-left: 6px;
}
.stateCodeSuccess{
  color:#67C23A
}
.stateCodeError{
  color:#F56C6C
}
.responseWrapper{
  height: 230px;
}
.responseWrapper:deep(.jv-code){
  padding: 10px 20px;
}

</style>