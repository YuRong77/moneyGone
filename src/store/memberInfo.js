// import axios from "axios";

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

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
};
