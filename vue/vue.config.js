const { defineConfig } = require('@vue/cli-service')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")

module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:{
      "/api":{
        target:'http://localhost:3000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ''
        }
      }
    }
  }
})

