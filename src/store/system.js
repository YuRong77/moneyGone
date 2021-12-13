import axios from "axios";

const state = {
  spendItemOptions: [],
  spendItemLoading: false,
};

const getters = {};

const mutations = {
  SET_SPEND_LOADING(state, payload) {
    state.spendItemLoading = payload;
  },
  SET_SPEND_OPTIONS(state, payload) {
    state.spendItemOptions = payload;
  },
};

const actions = {
  getSpendOptions(context, payload) {
    const uid = sessionStorage.getItem("uid");
    context.commit("SET_SPEND_LOADING", true);
    axios
      .get(
        `${process.env.VUE_APP_API_PATH}/api/system/getSpendItemOptions/${uid}/${payload.type}`
      )
      .then((res) => {
        if (res.data.status === 200) {
          context.commit("SET_SPEND_OPTIONS", res.data.result);
          context.commit("SET_SPEND_LOADING", false);
        }
      });
  },
  addSpendOptions(context, payload) {
    const _uid = sessionStorage.getItem("uid");
    const data = { ...payload, uid: _uid };
    console.log(data);
    axios
      .post(
        `${process.env.VUE_APP_API_PATH}/api/system/createSpendItemOptions`,
        data
      )
      .then((res) => {
        if (res.data.status === 200) {
          context.dispatch("getSpendOptions", { type: payload.type });
        }
      });
  },
  deleteSpendOptions(context, payload) {
    const _uid = sessionStorage.getItem("uid");
    const data = { ...payload, uid: _uid };
    axios
      .post(
        `${process.env.VUE_APP_API_PATH}/api/system/deleteSpendItemOptions`,
        data
      )
      .then((res) => {
        if (res.data.status === 200) {
          context.dispatch("getSpendOptions", { type: payload.type });
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
