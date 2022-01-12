<template>
  <div>
    <router-view class="routeContent" />
    <Footer />
    <Copyright />
    <Loading v-show="isLoading" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Footer from "@/components/footer";
import Copyright from "@/components/copyright";
import Loading from "@/components/loading";
export default {
  components: {
    Footer,
    Copyright,
    Loading,
  },
  computed: {
    ...mapState("memberInfo", ["isLoading"]),
  },
  created() {
    const theme = sessionStorage.getItem("theme");
    if (theme) this.$store.commit("setting/SET_THEME", theme);
    this.$store.dispatch("memberInfo/getMemberInfo");
    this.$store.dispatch("memo/getMemo");
  },
};
</script>

<style>
.routeContent {
  /* footer copyright */
  min-height: calc(100vh - 65px - 30px);
  /* min-height: calc(100vh - 65px - 30px - 40px); */
}
</style>