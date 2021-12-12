<template>
  <div class="memoPopup">
    <div class="memoCard">
      <input type="text" v-model="title" />
      <textarea v-model="content" />
      <button v-if="!isAddMemo" @click="updateMemo()">update</button>
      <button v-if="isAddMemo" @click="createMemo()">create</button>
      <button @click="closeMemo()">close</button>
      <button v-if="!isAddMemo" @click="deleteMemo()">delete</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["memoPopup", "currentMemo"],
  data() {
    return {
      title: null,
      content: null,
      isAddMemo: true,
    };
  },
  methods: {
    createMemo() {
      const data = {
        title: this.title,
        content: this.content,
      };
      this.$store.dispatch("memo/createMemo", data);
      this.closeMemo();
    },
    updateMemo() {
      const data = {
        title: this.title,
        content: this.content,
        id: this.currentMemo.id,
      };
      this.$store.dispatch("memo/updateMemo", data);
      this.closeMemo();
    },
    deleteMemo() {
      const data = {
        id: this.currentMemo.id,
      };
      this.$store.dispatch("memo/deleteMemo", data);
      this.closeMemo();
    },
    closeMemo() {
      this.$emit("update:memoPopup", false);
    },
  },
  created() {
    if (this.currentMemo) {
      this.title = this.currentMemo.title;
      this.content = this.currentMemo.content;
      this.isAddMemo = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.memoPopup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
  .memoCard {
    width: 300px;
    height: 450px;
    border-radius: 15px;
    background: white;
  }
}
</style>