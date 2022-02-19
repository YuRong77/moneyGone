import { POST } from "../tools/fetch";

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
    POST(
      `${process.env.VUE_APP_API_PATH}/api/spendRecord/getSpendRecord`,
      payload
    )
      .then((res) => {
        context.commit("memberInfo/SET_ISLOADING", false, { root: true });
        context.commit("SET_SPENDLIST", res.result);
      })
      .catch(() =>
        context.commit("memberInfo/SET_ISLOADING", false, { root: true })
      );
  },
  addSpend(context, payload) {
    POST(
      `${process.env.VUE_APP_API_PATH}/api/spendRecord/updateSpend`,
      payload
    ).then((res) => {
      if (res.status === 200) {
        context.dispatch("memberInfo/getMemberInfo", null, { root: true });
      }
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
