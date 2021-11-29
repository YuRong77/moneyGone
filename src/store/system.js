import axios from "axios";

const state = {
  spendItemOptions: [],
};

const getters = {};

const mutations = {
  SET_SPEND_OPTIONS(state, payload) {
    state.spendItemOptions = [payload];
  },
};

const actions = {
  getSpendOptions(context, payload) {
    const uid = sessionStorage.getItem("uid");
    axios
      .get(
        `${process.env.VUE_APP_API_PATH}/api/system/getSpendItemOptions/${uid}/${payload.type}`
      )
      .then((res) => {
        if (res.data.status === 200) {
          context.commit("SET_SPEND_OPTIONS", res.data.result);
        }
      });
  },
  addSpendOptions(context, payload) {
    const _uid = sessionStorage.getItem("uid");
    const data = { ...payload, uid: _uid };
    // axios
    //   .post(`${process.env.VUE_APP_API_PATH}/api/spendRecord/updateSpend`, data)
    //   .then((res) => {
    //     if (res.data.status === 200) {
    //       context.dispatch("memberInfo/getMemberInfo", null, { root: true });
    //     }
    //   });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
