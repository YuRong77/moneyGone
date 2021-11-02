<template>
  <div id="app">
    <Header v-if="currentPage !== 'Login'" />
    <router-view />
    <Footer v-if="currentPage !== 'Login'" />
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
  data() {
    return {
      currentPage: null,
    };
  },
  watch: {
    $route(val) {
      this.currentPage = val.name;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  background: rgb(175, 175, 175);
}
#app {
  max-width: 768px;
  height: 100vh;
  background: rgb(236, 236, 236);
  margin: auto;
}
</style>
