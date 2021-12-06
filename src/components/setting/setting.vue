<template>
  <div class="setting">
    <h3>setting</h3>
    <button @click="setTheme('lightMode')">light</button>
    <button @click="setTheme('darkMode')">dark</button>
  </div>
</template>

<script>
export default {
  methods: {
    setTheme(val) {
      this.$store.dispatch("setting/test", val);
    },
  },
};
</script>

<style>
</style>