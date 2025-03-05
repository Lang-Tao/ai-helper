import Vue from 'vue'
import Vuex from 'vuex'
import storage from '../utils/storage'

Vue.use(Vuex);
// 用Vuex.Store对象用来记录token
const store = new Vuex.Store({

  state: {
    // 存储token
    token: "",
    user: {}
  },

  getters: {
    getToken(state) {
      return state.token || storage.get("token") || "";
    }
  },

  mutations: {
    // 修改token，并将token存入localStorage
    setToken(state, token) {
      state.token = token;
      storage.set('token', token);
      console.log('store、localstorage保存token成功！');
    },
    delToken(state) {
      state.token = "";
      storage.remove("token");
      console.log('store、localstorage删除token');
    },
    setUser(state, user) {
      state.user = user;
      console.log('user：', user);
    },
    delUser(state, user) {
      state.user = {};
      console.log('用户信息删除');
    },
    updateUser(state, user) {
      // 更新 state
      state.user = user;
    }
  },

  actions: {
    // removeToken: (context) => {
    // context.commit('setToken')
    // }
  },
});

export default store;
