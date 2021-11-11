<template>
  <div class="footer">
    <div
      class="footer_item"
      v-for="item in footerItem"
      :key="item.path"
      @click="changeViews(item.path)"
    >
      <div></div>
      <div class="text">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      footerItem: [
        { name: this.$t("LC_MAIN"), path: "Lobby" },
        { name: this.$t("LC_RECORD"), path: "Record" },
        { name: this.$t("LC_CHART"), path: "Chart" },
        { name: this.$t("LC_SETTING"), path: "Setting" },
      ],
      currentPath: this.$route.name,
    };
  },
  methods: {
    changeViews(path) {
      if (this.currentPath == path) return;
      this.currentPath = path;
      this.$router.push({ name: path });
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  background: #ffffff;
}
</style>