import axios from "axios";

const state = {
  memo: [],
};

const getters = {};

const mutations = {
  SET_MEMO(state, payload) {
    state.memo = payload;
  },
};

const actions = {
  getMemo(context) {
    const uid = sessionStorage.getItem("uid");
    axios
      .get(`${process.env.VUE_APP_API_PATH}/api/memo/getMemo/${uid}`)
      .then((res) => {
        context.commit("SET_MEMO", res.data.result);
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
