<template>
  <div class="header">
    <div class="name">{{ memberInfo.name }}</div>
    <div class="spendInfo">
      <div>
        <h3 class="font-14">{{ $t("LC_SPEND_TODAY") }}</h3>
        <p class="spend">NT$ {{ memberInfo.spendToday }}</p>
      </div>
      <div>
        <h3 class="font-14">{{ $t("LC_SPEND_MONTH") }}</h3>
        <p class="spend">NT$ {{ memberInfo.spendMonth }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("memberInfo", ["memberInfo"]),
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  text-align: center;
  height: 100px;
  .name {
    flex: 1;
  }
  .spendInfo {
    display: flex;
    justify-content: space-around;
    flex: 1;
    .spend {
      padding: 3px 5px;
      margin-top: 15px;
      border-radius: 8px;
      font-weight: bold;
    }
  }
}
</style>