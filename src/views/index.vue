<template>
  <div>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header";
import Footer from "@/components/footer";
export default {
  components: {
    Header,
    Footer,
  },
  created() {
    this.$store.dispatch("memberInfo/getMemberInfo");
    this.$store.dispatch("memo/getMemo");
  },
};
</script>

<style>
.content {
  min-height: calc(100vh - 100px - 65px);
}
</style>