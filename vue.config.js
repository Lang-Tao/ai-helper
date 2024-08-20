const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  
  //publicPath: '', // todo 项目域名前缀
  
  devServer:{
    port:7000
  },
  
  chainWebpack:config =>{
    config.plugin('html').tap(args =>{
      args[0].title = "my-app";
      return args;
  })
  }
})