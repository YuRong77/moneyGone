<template>
  <div class="editNamePopup">
    <div class="editNameCard">
      <h2>修改暱稱</h2>
      <input type="text" v-model="newName" />
      <div class="editBtn">
        <div class="normalBtn" @click="$emit('update:editNamePopup', false)">
          取消
        </div>
        <div class="confirmBtn" @click="editName()">確定</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["editNamePopup", "name"],
  data() {
    return {
      newName: null,
    };
  },
  methods: {
    editName() {
      const data = {
        name: this.newName,
      };
      this.$store.dispatch("setting/updateMemberName", data);
      this.$emit("update:editNamePopup", false);
    },
  },
  created() {
    this.newName = this.name;
  },
};
</script>

<style  lang="scss" scoped>
.editNamePopup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .editNameCard {
    width: 85%;
    height: 180px;
    padding: 20px 40px;
    border-radius: 15px;
    h2 {
      font-size: 18px;
      text-align: center;
      margin-bottom: 20px;
    }
    input {
      width: 100%;
      border-radius: 5px;
      padding: 5px 5px;
      margin-bottom: 30px;
    }
    .editBtn {
      display: flex;
      justify-content: space-between;
      div {
        width: 40%;
        font-size: 14px;
      }
    }
  }
}
</style>