import { POST } from "../tools/axios";

const state = {
  theme: "lightMode",
  lang: "zh-TW",
};

const getters = {};

const mutations = {
  SET_THEME(state, payload) {
    state.theme = payload;
  },
  SET_LANG(state, payload) {
    state.lang = payload;
  },
};

const actions = {
  updateMemberName(context, payload) {
    return new Promise((resolve, reject) => {
      POST(
        `${process.env.VUE_APP_API_PATH}/api/member/updateMemberName`,
        payload
      )
        .then((res) => {
          context.dispatch("memberInfo/getMemberInfo", null, { root: true });
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },
  changeLang(context, payload) {
    return new Promise((resolve, reject) => {
      POST(
        `${process.env.VUE_APP_API_PATH}/api/member/updateMemberLang`,
        payload
      )
        .then((res) => {
          sessionStorage.setItem("lang", payload.lang);
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },
  changeTheme(context, payload) {
    return new Promise((resolve, reject) => {
      POST(
        `${process.env.VUE_APP_API_PATH}/api/member/updateMemberTheme`,
        payload
      )
        .then((res) => {
          sessionStorage.setItem("theme", payload.theme);
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
