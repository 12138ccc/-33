import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

// 封装本地存储 vuex-persistedstate

// vuex-persistedstate--> 持久化state

// 1 下载
// - yarn add vuex-persistedstate@3.2.1
// 2 引入
// -import createPersistedState from 'vuex-persistedstate'
// 3 调用
// -  plugins: [createPersistedState()],

// 配置项
// key :默认值是vuex
// storage :存储的方式默认值是本地存储
// reducer :指定持久化哪些数据，函数，return一个对象。对象就作为存储的value
export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'HEIMA_TOUTIAO',
      reducer({ tokenObj }) {
        return { tokenObj }
      }
    })
  ],
  state: {
    tokenObj: {}
  },

  getters: {
    isLogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_COUNT(state, token) {
      state.tokenObj = token
    }
  }
})
