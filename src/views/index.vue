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
};
</script>

<style>
.content {
  min-height: calc(100vh - 90px - 60px);
}
</style>