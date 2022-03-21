import { GET, POST } from "../tools/axios";

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
    context.commit("memberInfo/SET_ISLOADING", true, { root: true });
    return new Promise((resolve, reject) => {
      GET(`${process.env.VUE_APP_API_PATH}/api/memo/getMemo`)
        .then((res) => {
          context.commit("memberInfo/SET_ISLOADING", false, { root: true });
          context.commit("SET_MEMO", res.result);
          resolve(res);
        })
        .catch((err) => {
          context.commit("memberInfo/SET_ISLOADING", false, { root: true });
          reject(err);
        });
    });
  },
  createMemo(context, payload) {
    return new Promise((resolve, reject) => {
      POST(`${process.env.VUE_APP_API_PATH}/api/memo/createMemo`, payload)
        .then((res) => {
          context.dispatch("getMemo");
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },
  updateMemo(context, payload) {
    return new Promise((resolve, reject) => {
      POST(`${process.env.VUE_APP_API_PATH}/api/memo/updateMemo`, payload)
        .then((res) => {
          context.dispatch("getMemo");
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },
  deleteMemo(context, payload) {
    return new Promise((resolve, reject) => {
      POST(`${process.env.VUE_APP_API_PATH}/api/memo/deleteMemo`, payload)
        .then((res) => {
          context.dispatch("getMemo");
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
