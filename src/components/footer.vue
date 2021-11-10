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
        { name: "大廳", path: "Lobby" },
        { name: "test", path: "Record" },
        { name: "test2", path: "Chart" },
        { name: "test3", path: "Setting" },
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