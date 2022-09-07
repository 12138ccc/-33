import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 声明一个变量，放到vuex
// vuex声明的变量
// state里声明
// 取法：$store.state.属性名

// vuex修改数据
// 自产自销
// 规范：函数命名采用大驼峰
// mutations：函数
// mutations里的函数的参数
// state：数据
// payload ：载荷，触发mutations的参数

// 触发mutations里面的方法
// this.$store.commit('mutations方法名字')
export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    bigNum(state) {
      return state.count * 10
    }
  },
  mutations: {
    SET_COUNT(state, payload) {
      state.count += payload
    }
  }
})
