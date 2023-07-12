const router = require('koa-router')()
const axios = require('axios');
const fs = require('fs');

router.get('/get', async (ctx, next) => {
  // 接受客户端的自定义 header 字段
  let customheader = (ctx.header?.customheader)?JSON.parse(ctx.header.customheader):{};
  var response = await axios({
    methods:"get",
    url:ctx.header.realurl,
    headers:{
      'content-type':ctx.header['content-type'],
      ...customheader
    }
  });

  ctx.body = JSON.stringify(response.data)

})

router.post('/post', async (ctx, next) => {
  // 接受客户端的自定义 header 字段
  let customheader = (ctx.header?.customheader)?JSON.parse(ctx.header.customheader):{};

  var response = await axios({
    methods:'post',
    headers:{
      'content-type':ctx.header['content-type'],
      ...customheader
    },
    data:ctx.request.body,
    url:ctx.header.realurl
  });

  ctx.body = JSON.stringify(response.data)
})


// 文件上传请求
router.post('/upload', async (ctx, next) => {
  // 接受客户端的自定义 header 字段
  let customheader = (ctx.header?.customheader)?JSON.parse(ctx.header.customheader):{};
  const files = ctx.request.files;
  let filepath = null; // 存入的临时文件地址
  let filesName = null; // 请求的字段名称
  let fileData = null; // 读取文件的二进制数据(buffer)
  for(let key in files){
    filesName = key;
    const file = files[key];
    filepath = file.filepath;
    fileData = fs.readFileSync(filepath);
  }
  var initFiles = {};
  initFiles[filesName] = filesName;
  console.log(ctx.header.realurl);
  const response = await axios({
    method: 'post',
    url:ctx.header.realurl,
    data: {
      ...initFiles,
      ...ctx.request.body
    },
    headers: {
      'Content-Type': 'multipart/form-data',  // 设置请求头为 multipart/form-data
      ...customheader // 析构自定义请求头参数
    },
  });
  ctx.body = JSON.stringify(response.data);
  // 删除本地存储的文件
  fs.unlink(filepath,(err)=>{if(err){console.error(err);return}})  
})




module.exports = router
