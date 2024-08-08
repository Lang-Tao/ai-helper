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
