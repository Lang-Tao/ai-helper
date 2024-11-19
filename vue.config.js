const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  
  publicPath: '/', 
  
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