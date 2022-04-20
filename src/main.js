import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./tools/iNoBounce";
import "./tools/bus";
// import Calendar from "v-calendar/lib/components/calendar.umd";
import DatePicker from "v-calendar/lib/components/date-picker.umd";
import VueI18n from "vue-i18n";
import zh_TW from "@/locales/zh_TW.json";
import zh_CN from "@/locales/zh_CN.json";
import en_US from "@/locales/en_US.json";
import ja_JP from "@/locales/ja_JP.json";

Vue.use(VueI18n);

// Vue.component("calendar", Calendar);
Vue.component("date-picker", DatePicker);

let messagesObj = {
  "zh-TW": zh_TW,
  "zh-CN": zh_CN,
  "en-US": en_US,
  "ja-JP": ja_JP,
};

let currentLang = window.sessionStorage.getItem("lang") || "zh-TW";
var html = document.documentElement;
html.setAttribute("lang", currentLang);
export const i18n = new VueI18n({
  locale: currentLang,
  fallbackLocale: currentLang,
  messages: messagesObj,
  silentTranslationWarn: true,
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
