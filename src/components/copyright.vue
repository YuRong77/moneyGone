<template>
  <div class="copyright">
    <p>&copy; {{ new Date().getFullYear() }} YuRong</p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.copyright {
  display: flex;
  justify-content: center;
  padding-top: 3px;
  height: 30px;
  background: rgb(250, 250, 250);
  color: rgb(175, 175, 175);
  font-size: 12px;
}
</style>