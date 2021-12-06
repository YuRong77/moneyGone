<template>
  <div class="footer">
    <div
      class="footer_item"
      v-for="item in footerItem"
      :key="item.path"
      @click="changeViews(item.path)"
    >
      <div class="icon"><i :class="item.icon"></i></div>
      <div class="text">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      footerItem: [
        { name: this.$t("LC_MAIN"), path: "Lobby", icon: "fas fa-home" },
        { name: this.$t("LC_RECORD"), path: "Record", icon: "fas fa-list-ul" },
        { name: this.$t("LC_CHART"), path: "Chart", icon: "far fa-chart-bar" },
        { name: this.$t("LC_SETTING"), path: "Setting", icon: "fas fa-cogs" },
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
  height: 65px;
  .footer_item {
    text-align: center;
    .icon {
      font-size: 24px;
    }
    .text {
      font-size: 14px;
    }
  }
}
</style>