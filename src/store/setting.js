import { POST } from "../tools/fetch";

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
    POST(
      `${process.env.VUE_APP_API_PATH}/api/member/updateMemberName`,
      payload
    ).then((res) => {
      if (res.status === 200) {
        context.dispatch("memberInfo/getMemberInfo", null, { root: true });
      }
    });
  },
  changeLang(context, payload) {
    POST(
      `${process.env.VUE_APP_API_PATH}/api/member/updateMemberLang`,
      payload
    ).then((res) => {
      if (res.status === 200) {
        sessionStorage.setItem("lang", payload.lang);
      }
    });
  },
  changeTheme(context, payload) {
    POST(
      `${process.env.VUE_APP_API_PATH}/api/member/updateMemberTheme`,
      payload
    ).then((res) => {
      if (res.status === 200) {
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
