import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isShowSmall:false,// 窗口大小
  },
  mutations: {
    setShowSmall(state, val) {
      state.isShowSmall = val;
    },
  },
  actions: {},
  modules: {}
});
