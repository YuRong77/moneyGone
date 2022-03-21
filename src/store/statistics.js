import { POST } from "../tools/axios";

const state = {
  spendStatistics: {},
};

const getters = {};

const mutations = {
  SET_STATISTICS(state, payload) {
    state.spendStatistics = payload;
  },
};

const actions = {
  getSpendStatistics(context, payload) {
    context.commit("memberInfo/SET_ISLOADING", true, { root: true });
    return new Promise((resolve, reject) => {
      POST(
        `${process.env.VUE_APP_API_PATH}/api/spendStatistics/getSpendStatistics`,
        payload
      )
        .then((res) => {
          context.commit("memberInfo/SET_ISLOADING", false, { root: true });
          context.commit("SET_STATISTICS", res.result);
          resolve(res);
        })
        .catch((err) => {
          context.commit("memberInfo/SET_ISLOADING", false, { root: true });
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
