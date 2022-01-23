<template>
  <div class="copyright font-12">
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
  align-items: center;
  height: 30px;
  background: rgb(250, 250, 250);
  color: rgb(175, 175, 175);
}
.darkMode .copyright {
  background: #4d5d6d;
  color: rgba(255, 255, 255, 0.75);
}
</style>