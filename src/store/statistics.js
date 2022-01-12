import axios from "axios";

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
    const _uid = sessionStorage.getItem("uid");
    const data = { ...payload, uid: _uid };
    context.commit("memberInfo/SET_ISLOADING", true, { root: true });
    axios
      .post(
        `${process.env.VUE_APP_API_PATH}/api/spendStatistics/getSpendStatistics`,
        data
      )
      .then((res) => {
        context.commit("memberInfo/SET_ISLOADING", false, { root: true });
        context.commit("SET_STATISTICS", res.data.result);
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
