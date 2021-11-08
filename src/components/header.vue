<template>
  <div class="header">
    <div class="name">123</div>
    <div class="spendInfo">
      <div>
        <h3>spendToday</h3>
        <p class="spend">100</p>
      </div>
      <div>
        <h3>spendMonth</h3>
        <p class="spend">1000</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  text-align: center;
  height: 90px;
  background: #456988;
  color: white;
  .name {
    flex: 1;
  }
  .spendInfo {
    display: flex;
    justify-content: space-around;
    flex: 2;
    .spend {
      padding: 3px 5px;
      margin-top: 5px;
      border-radius: 8px;
      background: #3b5871;
    }
  }
}
</style>