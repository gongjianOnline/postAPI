const { defineConfig } = require('@vue/cli-service')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")

module.exports = defineConfig({
  transpileDependencies: true,
})

