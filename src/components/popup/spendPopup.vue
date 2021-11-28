<template>
  <div class="spendPopup">
    <div class="spendCard">
      <p>{{ spendType }}</p>
      <input type="text" v-model="name" />
      <input type="number" v-model.number="spend" />
      <input type="text" v-model="remark" />
      <button @click="addSpend()">addSpend</button>
      <button @click="closeSpend()">close</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["spendPopup", "spendType"],
  data() {
    return {
      name: null,
      spend: null,
      remark: null,
    };
  },
  methods: {
    addSpend() {
      const data = {
        name: this.name,
        spend: this.spend,
        remark: this.remark,
        type: this.spendType,
      };
      this.$store.dispatch("spend/addSpend", data);
      this.closeSpend();
    },
    closeSpend() {
      this.$emit("update:spendPopup", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.spendPopup {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
  .spendCard {
    width: 300px;
    height: 400px;
    background: white;
  }
}
</style>