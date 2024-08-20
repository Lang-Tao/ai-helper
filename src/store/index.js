//该文件用于创建Vuex中最为核心的store

//引入Vue
import Vue from 'vue';
//引入Vuex
import Vuex from 'vuex';//引入插件并使用插件
Vue.use(Vuex); //使用插件后就可以在vm,vc里使用store配置项

//准备actions,用于响应组件中的动作
const actions = {};

//准备mutations,用于操作数据(state)
const mutations = {};

//准备state,用于存储数据
const state = {
    //存储用户信息
    user: {},
    //存储用户token
    token: '',
};

//创建store
const store = new Vuex.Store({
    actions: actions,
    mutations, //简写
    state //简写
});

//导出store
export default store;

