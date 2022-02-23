<template>
  <div class="editLangPopup popupMask">
    <div class="editLangCard p-card-s">
      <h2 class="font-18">{{ $t("LC_SELECT_LANG") }}</h2>
      <div class="langList">
        <div
          class="langItem"
          :class="{ active: item.value === newLang }"
          v-for="item in langList"
          :key="item.value"
          @click="newLang = item.value"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="editBtn">
        <div class="confirmBtn font-16" @click="editLang()">
          {{ $t("LC_CONFIRM") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["editLangPopup", "lang"],
  data() {
    return {
      newLang: null,
      langList: [
        { name: "繁體中文", value: "zh-TW" },
        { name: "简体中文", value: "zh-CN" },
        { name: "English", value: "en-US" },
        { name: "日本語", value: "ja-JP" },
      ],
    };
  },
  methods: {
    editLang() {
      if (this.lang === this.newLang)
        return this.$emit("update:editLangPopup", false);
      const data = {
        lang: this.newLang,
      };
      this.$store.dispatch("setting/changeLang", data);
      this.$store.commit("setting/SET_LANG", this.newLang);
      this.$i18n.locale = this.newLang;
      sessionStorage.setItem("lang", this.newLang);
      this.$emit("update:lang", this.newLang);
      this.$emit("update:editLangPopup", false);
    },
  },
  created() {
    this.newLang = this.lang;
  },
};
</script>

<style  lang="scss" scoped>
.editLangPopup {
  .editLangCard {
    width: 85%;
    max-width: 400px;
    height: 350px;
    padding: 20px 30px;
    border-radius: 15px;
    h2 {
      text-align: center;
      margin-bottom: 18px;
    }
    .langList {
      margin-bottom: 20px;
      .langItem {
        width: 100%;
        border-radius: 5px;
        padding: 10px 0;
        margin-bottom: 18px;
        text-align: center;
        &.active {
          background: #5e94c3;
          color: white;
        }
      }
    }
    .editBtn {
      display: flex;
      justify-content: center;
      div {
        width: 35%;
      }
    }
  }
}
</style>