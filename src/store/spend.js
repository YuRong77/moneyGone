import { POST } from "../tools/axios";

const state = {
  spendList: [],
};

const getters = {};

const mutations = {
  SET_SPENDLIST(state, payload) {
    state.spendList = payload;
  },
};

const actions = {
  getSpendRecord(context, payload) {
    context.commit("memberInfo/SET_ISLOADING", true, { root: true });
    return new Promise((resolve, reject) => {
      POST(
        `${process.env.VUE_APP_API_PATH}/api/spendRecord/getSpendRecord`,
        payload
      )
        .then((res) => {
          context.commit("memberInfo/SET_ISLOADING", false, { root: true });
          context.commit("SET_SPENDLIST", res.result);
          resolve(res);
        })
        .catch((err) => {
          context.commit("memberInfo/SET_ISLOADING", false, { root: true });
          reject(err);
        });
    });
  },
  addSpend(context, payload) {
    return new Promise((resolve, reject) => {
      POST(
        `${process.env.VUE_APP_API_PATH}/api/spendRecord/updateSpend`,
        payload
      )
        .then((res) => {
          context.dispatch("memberInfo/getMemberInfo", null, { root: true });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
