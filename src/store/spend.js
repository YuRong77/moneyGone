import axios from "axios";

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
    const _uid = sessionStorage.getItem("uid");
    const data = { ...payload, uid: _uid };
    context.commit("memberInfo/SET_ISLOADING", true, { root: true });
    axios
      .post(
        `${process.env.VUE_APP_API_PATH}/api/spendRecord/getSpendRecord`,
        data
      )
      .then((res) => {
        context.commit("memberInfo/SET_ISLOADING", false, { root: true });
        context.commit("SET_SPENDLIST", res.data.result);
      });
  },
  addSpend(context, payload) {
    const _uid = sessionStorage.getItem("uid");
    const data = { ...payload, uid: _uid };
    axios
      .post(`${process.env.VUE_APP_API_PATH}/api/spendRecord/updateSpend`, data)
      .then((res) => {
        if (res.data.status === 200) {
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
