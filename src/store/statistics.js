import { POST } from "../tools/fetch";

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
    POST(
      `${process.env.VUE_APP_API_PATH}/api/spendStatistics/getSpendStatistics`,
      payload
    )
      .then((res) => {
        context.commit("memberInfo/SET_ISLOADING", false, { root: true });
        context.commit("SET_STATISTICS", res.result);
      })
      .catch(() =>
        context.commit("memberInfo/SET_ISLOADING", false, { root: true })
      );
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
