import axios from "axios";

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
    const uid = sessionStorage.getItem("uid");
    context.commit("SET_ISLOADING", true);
    axios
      .get(`${process.env.VUE_APP_API_PATH}/api/member/getMemberInfo/${uid}`)
      .then((res) => {
        context.commit("SET_ISLOADING", false);
        context.commit("SET_MEMBER_INFO", res.data.result);
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
