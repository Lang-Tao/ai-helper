import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from'element-ui'; 
import'element-ui/lib/theme-chalk/index.css'; 

import "@/assets/iconfont/iconfont.css"
import "@/assets/iconfont/iconfont.js"


import "@/assets/css/global.css";

Vue.config.productionTip = false;  // 阻止产生警告

Vue.use(ElementUI);


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  const defaultTitle = "智能工程助手"; // 初始化标题
  if (to.meta.title || !to.meta.title === "undefined") {
    document.title = to.meta.title + " | 智能工程助手";
  } else {
    document.title = defaultTitle;
  }
  next();
})



