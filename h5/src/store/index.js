import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户名
    name:""
  },
  mutations: {
    updata(state,uname){
      state.name = uname
    }
  },
  // actions: {
  // },
  // modules: {
  // }
  getters: {
    getname(state){
      return "书友：" + state.name
    }
  }
})
