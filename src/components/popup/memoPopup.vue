<template>
  <div class="memoPopup popupMask">
    <div class="memoCard p-card-s boxShadow">
      <div class="title">
        <div class="titleText font-18" v-if="!isEdit">{{ title }}</div>
        <div class="inputBox" v-if="isEdit">
          <input
            type="text"
            :placeholder="$t('LC_PLACEHODLER_TITLE')"
            v-model="title"
          />
        </div>
      </div>
      <div class="content">
        <pre class="contentText font-16" v-if="!isEdit">{{ content }}</pre>
        <div class="inputBox" v-if="isEdit">
          <textarea
            class="inputBox"
            rows="12"
            :placeholder="$t('LC_PLACEHODLER_CONTENT')"
            v-model="content"
          />
        </div>
      </div>
      <div class="formBtn">
        <div class="cancelBtn btn" @click="closeMemo()">
          {{ $t("LC_CANCEL") }}
        </div>
        <div
          class="confirmBtn btn"
          v-if="!isAddMemo && isEdit"
          @click="updateMemo()"
        >
          {{ $t("LC_UPDATE") }}
        </div>
        <div class="confirmBtn btn" v-if="isAddMemo" @click="createMemo()">
          {{ $t("LC_ADD") }}
        </div>
      </div>
      <div class="memoEdit">
        <div
          class="delete boxShadow btn"
          v-if="!isAddMemo"
          @click="deleteMemo()"
        >
          <i class="fas fa-trash-alt"></i>
        </div>
        <div
          class="edit boxShadow btn"
          v-if="!isAddMemo"
          @click="isEdit = true"
        >
          <i class="fas fa-pen"></i>
        </div>
      </div>
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
      isEdit: true,
    };
  },
  methods: {
    createMemo() {
      const data = {
        title: this.title,
        content: this.content,
      };
      this.$store
        .dispatch("memo/createMemo", data)
        .then((res) => this.$bus.$emit("sendMessage", res.message, res.state))
        .catch((err) => this.$bus.$emit("sendMessage", err.message, err.state));
      this.closeMemo();
    },
    updateMemo() {
      const data = {
        title: this.title,
        content: this.content,
        memoID: this.currentMemo.id,
      };
      this.$store
        .dispatch("memo/updateMemo", data)
        .then((res) => this.$bus.$emit("sendMessage", res.message, res.state))
        .catch((err) => this.$bus.$emit("sendMessage", err.message, err.state));
      this.closeMemo();
    },
    deleteMemo() {
      const data = {
        memoID: this.currentMemo.id,
      };
      this.$store
        .dispatch("memo/deleteMemo", data)
        .then((res) => this.$bus.$emit("sendMessage", res.message, res.state))
        .catch((err) => this.$bus.$emit("sendMessage", err.message, err.state));
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
      this.isEdit = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.memoPopup {
  .memoCard {
    position: relative;
    .title {
      margin-bottom: 20px;
      user-select: text;
      -webkit-user-select: text;
      -moz-user-select: text;
      -ms-user-select: text;
    }
    .content {
      min-height: 275px;
      margin-bottom: 10px;
      user-select: text;
      -webkit-user-select: text;
      -moz-user-select: text;
      -ms-user-select: text;
    }
    .memoEdit {
      position: absolute;
      left: 50%;
      bottom: -80px;
      transform: translateX(-50%);
      display: flex;
      justify-content: space-between;
      div {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 15px;
      }
      .delete {
        color: #ff7d7d;
      }
    }
  }
}
</style>