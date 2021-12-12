<template>
  <div class="spendPopup">
    <div class="spendCard">
      <h3>{{ getSpendType(spendType) }}</h3>
      <div class="spendForm">
        <div class="inputBox">
          <label for="name">名稱</label>
          <input class="inputBox" type="text" id="name" v-model="name" />
        </div>
        <div class="hotKey">
          <h5>快捷選項</h5>
          <div class="hotKeyList" v-if="!spendItemLoading">
            <div
              class="hotKeyItem"
              v-for="item in spendItemOptions"
              :key="item.id"
            >
              {{ item.name }}
            </div>
          </div>
          <div v-else class="loading">
            <i class="fas fa-circle-notch fa-spin"></i>
          </div>
          <div class="addHotKey">
            <transition name="hotKeyOpen">
              <input
                type="text"
                v-model="newSpendItem"
                v-if="openNewSpendItem"
              />
            </transition>
            <div
              class="hotKeyBtn"
              v-if="openNewSpendItem"
              @click="addNewSpendItem()"
            >
              新增
            </div>
            <div
              class="hotKeyBtn"
              v-if="openNewSpendItem"
              @click="openNewSpendItem = false"
            >
              取消
            </div>
            <div
              class="hotKeyBtn"
              v-if="!openNewSpendItem"
              @click="openAddSpendItem()"
            >
              +
            </div>
          </div>
        </div>
        <div class="inputBox">
          <label for="spend">金額</label>
          <input class="inputBox" type="text" id="spend" v-model="spend" />
        </div>
        <div class="inputBox">
          <label for="remark">備註</label>
          <input class="inputBox" type="text" id="remark" v-model="remark" />
        </div>
      </div>
      <div class="formBtn">
        <div @click="addSpend()">addSpend</div>
        <div @click="closeSpend()">close</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["spendPopup", "spendType"],
  data() {
    return {
      name: null,
      spend: null,
      remark: null,
      newSpendItem: null,
      openNewSpendItem: false,
    };
  },
  computed: {
    ...mapState("system", ["spendItemOptions", "spendItemLoading"]),
  },
  methods: {
    getSpendType(type) {
      if (type === 1) return this.$t("LC_LIFE");
      if (type === 2) return this.$t("LC_FUN");
      if (type === 3) return this.$t("LC_STUDY");
      if (type === 4) return this.$t("LC_OTHER");
    },
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
    openAddSpendItem() {
      this.openNewSpendItem = true;
    },
    addNewSpendItem() {
      const data = {
        name: this.newSpendItem,
        type: this.spendType,
      };
      this.$store.dispatch("system/addSpendOptions", data);
      this.newSpendItem = null;
      this.openNewSpendItem = false;
    },
    closeSpend() {
      this.$emit("update:spendPopup", false);
    },
  },
  created() {
    this.$store.dispatch("system/getSpendOptions", { type: this.spendType });
  },
};
</script>

<style lang="scss" scoped>
.spendPopup {
  position: fixed;
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
    height: 410px;
    border-radius: 15px;
    padding: 20px 20px;
    background: white;
    h3 {
      text-align: center;
      margin-bottom: 30px;
    }
    .spendForm {
      margin-bottom: 20px;
      .hotKey {
        margin-bottom: 20px;
        h5 {
          font-size: 12px;
          margin-bottom: 10px;
        }
        .hotKeyList {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 5px;
          .hotKeyItem {
            padding: 6px 15px;
            border-radius: 5px;
            background: blanchedalmond;
            margin: 0 6px 6px 0;
            font-size: 12px;
          }
        }
        .addHotKey {
          display: flex;
          input {
            width: 130px;
            margin-right: 10px;
          }
          .hotKeyBtn {
            padding: 6px 15px;
            margin-right: 5px;
            font-size: 12px;
            border-radius: 5px;
            background: #f8f9fc;
          }
        }
      }
    }
    .formBtn {
      display: flex;
      justify-content: flex-end;
      div {
        padding: 6px 15px;
        margin-left: 5px;
        font-size: 12px;
        border-radius: 5px;
        background: #f8f9fc;
      }
    }
  }
}
// vue transition
.hotKeyOpen-enter,
.hotKeyOpen-leave-to {
  max-width: 0;
}
.hotKeyOpen-enter-active,
.hotKeyOpen-leave-active {
  transition: max-width 0.5s;
}
.hotKeyOpen-enter-to,
.hotKeyOpen-leave {
  max-width: 130px;
}
</style>