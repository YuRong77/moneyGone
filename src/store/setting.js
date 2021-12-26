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
  updateMemberName(context, payload) {
    const _uid = sessionStorage.getItem("uid");
    const data = { ...payload, uid: _uid };
    axios
      .post(`${process.env.VUE_APP_API_PATH}/api/member/updateMemberName`, data)
      .then((res) => {
        if (res.data.status === 200) {
          console.log(res.data.result, "updateName");
        }
      });
  },
  changeLang(context, payload) {
    const _uid = sessionStorage.getItem("uid");
    const data = { ...payload, uid: _uid };
    axios
      .post(`${process.env.VUE_APP_API_PATH}/api/member/updateMemberLang`, data)
      .then((res) => {
        if (res.data.status === 200) {
          console.log(res.data.result, "updateLang");
        }
      });
  },
  changeTheme(context, payload) {
    const _uid = sessionStorage.getItem("uid");
    const data = { ...payload, uid: _uid };
    axios
      .post(
        `${process.env.VUE_APP_API_PATH}/api/member/updateMemberTheme`,
        data
      )
      .then((res) => {
        if (res.data.status === 200) {
          sessionStorage.setItem("theme", payload.theme);
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
