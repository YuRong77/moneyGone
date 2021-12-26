<template>
  <div>
    <router-view class="routeContent" />
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/footer";
export default {
  components: {
    Footer,
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
  min-height: calc(100vh - 65px);
}
</style>