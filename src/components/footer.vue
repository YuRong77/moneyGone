<template>
  <div class="footer">
    <div class="footerList">
      <div
        class="footerItem btn"
        v-for="item in footerItem"
        :key="item.path"
        @click="changeViews(item.path)"
      >
        <div class="icon"><i :class="item.icon"></i></div>
        <div class="text font-14">{{ item.name }}</div>
      </div>
    </div>
    <div class="copyright font-12">
      <p>&copy; {{ new Date().getFullYear() }} YuRong</p>
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
        { name: this.$t("LC_SETTING"), path: "Setting", icon: "fas fa-cog" },
      ],
      currentPath: this.$route.name,
    };
  },
  methods: {
    changeViews(path) {
      if (this.currentPath == path) return;
      this.currentPath = path;
      this.$router.replace({ name: path });
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.footerList {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 70px;
  .footerItem {
    text-align: center;
    flex: 1;
    .icon {
      font-size: 24px;
    }
  }
}
.copyright {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  color: #bfbfbf;
  padding: 0 30px;
}
.darkMode .copyright {
  color: #d7d7d7;
}
</style>