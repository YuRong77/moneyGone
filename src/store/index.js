import Vue from "vue";
import Vuex from "vuex";
import memberInfo from "./memberInfo";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    memberInfo,
  },
});
