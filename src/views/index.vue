<template>
  <div>
    <router-view class="routeContent" />
    <Footer />
    <Copyright />
  </div>
</template>

<script>
import Footer from "@/components/footer";
import Copyright from "@/components/copyright";
export default {
  components: {
    Footer,
    Copyright,
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
  min-height: calc(100vh - 65px - 30px - 40px);
}
</style>