import { GET, POST } from "../tools/fetch";

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
    context.commit("SET_SPEND_LOADING", true);
    GET(
      `${process.env.VUE_APP_API_PATH}/api/system/getSpendItemOptions/${payload.type}`
    ).then((res) => {
      if (res.status === 200) {
        context.commit("SET_SPEND_OPTIONS", res.result);
        context.commit("SET_SPEND_LOADING", false);
      }
    });
  },
  addSpendOptions(context, payload) {
    POST(
      `${process.env.VUE_APP_API_PATH}/api/system/createSpendItemOptions`,
      payload
    ).then((res) => {
      if (res.status === 200) {
        context.dispatch("getSpendOptions", { type: payload.type });
      }
    });
  },
  deleteSpendOptions(context, payload) {
    POST(
      `${process.env.VUE_APP_API_PATH}/api/system/deleteSpendItemOptions`,
      payload
    ).then((res) => {
      if (res.status === 200) {
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
