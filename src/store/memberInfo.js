import axios from "axios";

const state = {
  memberInfo: {
    name: "",
    spendList: [],
    spendMonth: 0,
    spendToday: 0,
  },
};

const getters = {};

const mutations = {
  SET_MEMBER_INFO(state, payload) {
    state.memberInfo = { ...payload };
  },
};

const actions = {
  getMemberInfo(context) {
    const uid = sessionStorage.getItem("uid");
    axios
      .get(`${process.env.VUE_APP_API_PATH}/api/member/getMemberInfo/${uid}`)
      .then((res) => {
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
