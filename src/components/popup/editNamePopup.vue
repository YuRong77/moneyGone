<template>
  <div class="editNamePopup popupMask">
    <div class="editNameCard p-card-s btnShadow">
      <h2 class="font-18">{{ $t("LC_EDIT_NICKNAME") }}</h2>
      <input type="text" v-model="newName" />
      <div class="formBtn">
        <div
          class="cancelBtn font-16"
          @click="$emit('update:editNamePopup', false)"
        >
          {{ $t("LC_CANCEL") }}
        </div>
        <div class="confirmBtn font-16" @click="editName()">
          {{ $t("LC_CONFIRM") }}
        </div>
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
  .editNameCard {
    h2 {
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
      }
    }
  }
}
</style>