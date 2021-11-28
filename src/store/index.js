import Vue from "vue";
import Vuex from "vuex";
import memberInfo from "./memberInfo";
import memo from "./memo";
import spend from "./spend";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    memberInfo,
    memo,
    spend,
  },
});
