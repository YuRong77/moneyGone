<template>
  <div>
    <router-view class="content" />
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
    this.$store.dispatch("memberInfo/getMemberInfo");
    this.$store.dispatch("memo/getMemo");
  },
};
</script>

<style>
.content {
  min-height: calc(100vh - 65px);
}
</style>