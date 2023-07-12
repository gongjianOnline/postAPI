const router = require('koa-router')()
const axios = require('axios');

router.get('/get', async (ctx, next) => {
  // 接受客户端的自定义 header 字段
  let customheader = JSON.parse(ctx.header.customheader);
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
  let customheader = JSON.parse(ctx.header.customheader);

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




module.exports = router
