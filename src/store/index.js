import Vue from "vue";
import Vuex from "vuex";
import memberInfo from "./memberInfo";
import memo from "./memo";
import spend from "./spend";
import system from "./system";
import setting from "./setting";
import statistics from "./statistics";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    memberInfo,
    memo,
    spend,
    system,
    setting,
    statistics,
  },
});
