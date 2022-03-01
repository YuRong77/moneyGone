<template>
  <div class="spendPopup popupMask">
    <div class="spendCard p-card-s boxShadow">
      <h3>{{ getSpendType(spendType) }}</h3>
      <div class="spendForm">
        <div class="inputBox">
          <label for="name">{{ $t("LC_NAME") }}</label>
          <input class="inputBox" type="text" id="name" v-model="name" />
        </div>
        <div class="hotKey">
          <h5 class="font-12">{{ $t("LC_HOTKEY") }}</h5>
          <div class="hotKeyList" v-if="!spendItemLoading">
            <div
              class="hotKeyItem font-14"
              :class="{ shake: openDeleteSpendItem }"
              v-for="item in spendItemOptions"
              :key="item.id"
              @click="useHotKey(item.name)"
            >
              <div
                class="deleteHotKey font-14"
                v-if="openDeleteSpendItem"
                @click="deleteSpendItem(item)"
              >
                x
              </div>
              <span>{{ item.name }}</span>
            </div>
          </div>
          <div v-else class="loading-s">
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
              class="hotKeyBtn confirmBtn deleteHotKey font-14"
              v-if="openNewSpendItem"
              @click="addNewSpendItem()"
            >
              {{ $t("LC_JOIN") }}
            </div>
            <div
              class="hotKeyBtn font-14"
              v-if="!openNewSpendItem && !openDeleteSpendItem"
              @click="openNewSpendItem = true"
            >
              +
            </div>
            <div
              class="hotKeyBtn font-14"
              v-if="!openNewSpendItem && !openDeleteSpendItem"
              @click="openDeleteSpendItem = true"
            >
              -
            </div>
            <div
              class="hotKeyBtn font-14"
              v-if="openNewSpendItem || openDeleteSpendItem"
              @click="
                openNewSpendItem = false;
                openDeleteSpendItem = false;
              "
            >
              {{ $t("LC_CANCEL") }}
            </div>
          </div>
        </div>
        <div class="inputBox">
          <label for="spend">{{ $t("LC_AMOUNT") }}</label>
          <input
            class="inputBox"
            type="number"
            id="spend"
            v-model.number="spend"
          />
        </div>
        <div class="inputBox">
          <label for="remark">{{ $t("LC_REMARK") }}</label>
          <input class="inputBox" type="text" id="remark" v-model="remark" />
        </div>
      </div>
      <div class="formBtn">
        <div class="cancelBtn btn" @click="closeSpend()">{{ $t("LC_CLOSE") }}</div>
        <div class="confirmBtn btn" @click="addSpend()">{{ $t("LC_ADD") }}</div>
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
      openDeleteSpendItem: false,
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
    useHotKey(val) {
      if (this.openDeleteSpendItem) return;
      this.name = val;
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
    addNewSpendItem() {
      const data = {
        name: this.newSpendItem,
        type: this.spendType,
      };
      this.$store.dispatch("system/addSpendOptions", data);
      this.newSpendItem = null;
      this.openNewSpendItem = false;
    },
    deleteSpendItem(item) {
      const data = {
        id: item.id,
        type: this.spendType,
      };
      this.$store.dispatch("system/deleteSpendOptions", data);
      this.openDeleteSpendItem = false;
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
  .spendCard {
    h3 {
      text-align: center;
      margin-bottom: 30px;
    }
    .spendForm {
      margin-bottom: 20px;
      .hotKey {
        margin-bottom: 20px;
        h5 {
          margin-bottom: 10px;
        }
        .hotKeyList {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 5px;
          .hotKeyItem {
            position: relative;
            padding: 6px 15px;
            border-radius: 5px;
            margin: 0 6px 6px 0;
            .deleteHotKey {
              position: absolute;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              left: 50%;
              top: -10px;
              transform: translateX(-50%);
              display: flex;
              justify-content: center;
            }
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
            margin-right: 10px;
            border-radius: 5px;
          }
        }
      }
    }
  }
}
</style>