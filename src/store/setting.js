import axios from "axios";

const state = {
  theme: "lightMode",
};

const getters = {};

const mutations = {
  SET_THEME(state, payload) {
    state.theme = payload;
  },
};

const actions = {
  test(context, payload) {
    context.commit("SET_THEME", payload);
    // const _uid = sessionStorage.getItem("uid");
    // const data = { ...payload, uid: _uid };
    // axios
    //   .post(`${process.env.VUE_APP_API_PATH}/api/spendRecord/updateSpend`, data)
    //   .then((res) => {
    //     if (res.data.status === 200) {
    //       context.dispatch("memberInfo/getMemberInfo", null, { root: true });
    //     }
    //   });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
