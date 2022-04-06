import { GET, POST } from "../tools/axios";

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
    return new Promise((resolve, reject) => {
      GET(
        `${process.env.VUE_APP_API_PATH}/api/system/getSpendItemOptions/${payload.type}`
      )
        .then((res) => {
          context.commit("SET_SPEND_OPTIONS", res.result);
          context.commit("SET_SPEND_LOADING", false);
          resolve(res);
        })
        .catch((err) => {
          context.commit("SET_SPEND_LOADING", false);
          reject(err);
        });
    });
  },
  addSpendOptions(context, payload) {
    return new Promise((resolve, reject) => {
      POST(
        `${process.env.VUE_APP_API_PATH}/api/system/createSpendItemOptions`,
        payload
      )
        .then((res) => {
          context.dispatch("getSpendOptions", { type: payload.type });
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },
  deleteSpendOptions(context, payload) {
    return new Promise((resolve, reject) => {
      POST(
        `${process.env.VUE_APP_API_PATH}/api/system/deleteSpendItemOptions`,
        { id: payload.id }
      )
        .then((res) => {
          context.dispatch("getSpendOptions", { type: payload.type });
          resolve(res);
        })
        .catch((err) => reject(err));
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
