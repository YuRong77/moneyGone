import Vue from "vue";
import Vuex from "vuex";
import memberInfo from "./memberInfo";
import memo from "./memo";
import spend from "./spend";
import system from "./system";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    memberInfo,
    memo,
    spend,
    system,
  },
});
