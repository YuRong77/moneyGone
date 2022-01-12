import axios from "axios";

const state = {
  memoList: [],
};

const getters = {};

const mutations = {
  SET_MEMO(state, payload) {
    state.memoList = payload;
  },
};

const actions = {
  getMemo(context) {
    const uid = sessionStorage.getItem("uid");
    context.commit("memberInfo/SET_ISLOADING", true, { root: true });
    axios
      .get(`${process.env.VUE_APP_API_PATH}/api/memo/getMemo/${uid}`)
      .then((res) => {
        context.commit("memberInfo/SET_ISLOADING", false, { root: true });
        context.commit("SET_MEMO", res.data.result);
      });
  },
  createMemo(context, payload) {
    const _uid = sessionStorage.getItem("uid");
    const data = { ...payload, uid: _uid };
    axios
      .post(`${process.env.VUE_APP_API_PATH}/api/memo/createMemo`, data)
      .then((res) => {
        if (res.data.status === 200) {
          context.dispatch("getMemo");
        }
      });
  },
  updateMemo(context, payload) {
    const _uid = sessionStorage.getItem("uid");
    const data = { ...payload, uid: _uid };
    axios
      .post(`${process.env.VUE_APP_API_PATH}/api/memo/updateMemo`, data)
      .then((res) => {
        if (res.data.status === 200) {
          context.dispatch("getMemo");
        }
      });
  },
  deleteMemo(context, payload) {
    const _uid = sessionStorage.getItem("uid");
    const data = { ...payload, uid: _uid };
    axios
      .post(`${process.env.VUE_APP_API_PATH}/api/memo/deleteMemo`, data)
      .then((res) => {
        if (res.data.status === 200) {
          context.dispatch("getMemo");
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
