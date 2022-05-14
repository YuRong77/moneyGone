<template>
  <div>
    <router-view class="routeContent" />
    <Footer v-if="isAlive" />
    <Loading v-show="isLoading" />
    <Message />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Footer from "@/components/footer";
import Loading from "@/components/loading";
import Message from "@/components/message";
export default {
  components: {
    Footer,
    Loading,
    Message,
  },
  data() {
    return {
      isAlive: true,
    };
  },
  computed: {
    ...mapState("memberInfo", ["isLoading"]),
    ...mapState("setting", ["lang"]),
  },
  watch: {
    lang() {
      this.isAlive = false;
      this.$nextTick(() => {
        this.isAlive = true;
      });
    },
  },
  created() {
    const theme = sessionStorage.getItem("theme");
    if (theme) this.$store.commit("setting/SET_THEME", theme);
    this.$store
      .dispatch("memberInfo/getMemberInfo")
      .catch((err) => this.$bus.$emit("sendMessage", err.message, err.state));
    this.$store
      .dispatch("memo/getMemo")
      .catch((err) => this.$bus.$emit("sendMessage", err.message, err.state));
  },
};
</script>

<style>
.routeContent {
  /* 減去footer */
  min-height: calc(100vh - 95px);
}
@media (min-width: 900px) {
  /* 減去border */
  .routeContent {
    min-height: calc(100vh - 100px - 95px);
  }
}
</style>