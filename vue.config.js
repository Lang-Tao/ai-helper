const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer:{
    port:7000
  },
  publicPath:'',
  chainWebpack:config =>{
    config.plugin('html').tap(args =>{
      args[0].title = "my-app";
      return args;
  })
  }
})