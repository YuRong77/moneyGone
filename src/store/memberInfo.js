import { GET } from "../tools/fetch";

const state = {
  memberInfo: {
    name: "",
    spendList: [],
    spendMonth: 0,
    spendToday: 0,
  },
  isLoading: false,
};

const getters = {};

const mutations = {
  SET_MEMBER_INFO(state, payload) {
    state.memberInfo = { ...payload };
  },
  SET_ISLOADING(state, payload) {
    state.isLoading = payload;
  },
};

const actions = {
  getMemberInfo(context) {
    context.commit("SET_ISLOADING", true);
    return new Promise((resolve, reject) => {
      GET(`${process.env.VUE_APP_API_PATH}/api/member/getMemberInfo`)
        .then((res) => {
          context.commit("SET_MEMBER_INFO", res.result);
          context.commit("SET_ISLOADING", false);
          resolve(res);
        })
        .catch((err) => {
          context.commit("SET_ISLOADING", false);
          reject(err);
        });
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
