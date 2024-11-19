import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from'element-ui'; 
import'element-ui/lib/theme-chalk/index.css'; 

import "@/assets/iconfont/iconfont.css"
import "@/assets/iconfont/iconfont.js"


import "@/assets/css/global.css";

import store from './store/index.js';

// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

// echarts
import ECharts from "echarts";
Vue.prototype.$echarts = ECharts;

// 代码显示

// 引入使代码行高亮的插件
import Highlight from "@/plugins/hightlight-plugins"
// 引入vue-markdown
import VueMarkdown from "vue-markdown"


// 将vue-markdown注册为全局组件
Vue.component("vue-markdown",  VueMarkdown)
Vue.use(Highlight);


// 阻止产生警告
Vue.config.productionTip = false;  

Vue.use(ElementUI);


Vue.config.productionTip = false

new Vue({
  
  router,
  store,
  render: h => h(App),
  
}).$mount('#app')


document.title = "智能工程助手"


router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  const defaultTitle = "智能工程助手"; // 初始化标题
  if (to.meta.title) {
    document.title = to.meta.title + " | 智能工程助手";
  } else {
    document.title = defaultTitle;
  }
  next();
})



