import { GET, POST } from "../tools/fetch";

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
    GET(`${process.env.VUE_APP_API_PATH}/api/memo/getMemo`)
      .then((res) => {
        context.commit("memberInfo/SET_ISLOADING", false, { root: true });
        context.commit("SET_MEMO", res.result);
      })
      .catch(() =>
        context.commit("memberInfo/SET_ISLOADING", false, { root: true })
      );
  },
  createMemo(context, payload) {
    POST(`${process.env.VUE_APP_API_PATH}/api/memo/createMemo`, payload).then(
      (res) => {
        if (res.status === 200) {
          context.dispatch("getMemo");
        }
      }
    );
  },
  updateMemo(context, payload) {
    axios
      .post(`${process.env.VUE_APP_API_PATH}/api/memo/updateMemo`, payload)
      .then((res) => {
        if (res.status === 200) {
          context.dispatch("getMemo");
        }
      });
  },
  deleteMemo(context, payload) {
    axios
      .post(`${process.env.VUE_APP_API_PATH}/api/memo/deleteMemo`, payload)
      .then((res) => {
        if (res.status === 200) {
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
