<template>
  <div class="detailPopup popupMask">
    <div class="detailCard p-card boxShadow">
      <h2 class="font-16">{{ currentDetail.date }} {{ $t("LC_DETAIL") }}</h2>
      <div class="detailList">
        <div
          class="detailItem"
          v-for="(item, index) in currentDetail.list"
          :key="index"
        >
          <div class="directions">
            <span class="spendTime font-14"
              >{{ $t("LC_BUILD_TIME") }}: {{ getDate(item.date) }}</span
            >
            <div class="remark">
              <span class="font-14">{{ $t("LC_REMARK") }}: </span>
              <span class="font-14" v-show="item.id !== currentSpendItem.id">
                {{ item.remark }}
              </span>
              <input
                type="text"
                v-model="currentSpendItem.remark"
                v-show="item.id === currentSpendItem.id"
              />
            </div>
          </div>
          <div class="info">
            <div class="type"><i :class="getSpendIcon(item.type)"></i></div>
            <div class="name font-16">
              <span v-show="item.id !== currentSpendItem.id">{{
                item.name
              }}</span>
              <input
                type="text"
                v-model="currentSpendItem.name"
                v-show="item.id === currentSpendItem.id"
              />
            </div>
            <div class="spend font-16">
              <span v-show="item.id !== currentSpendItem.id"
                >NT$ {{ item.spend }}</span
              >
              <input
                type="text"
                v-model.number="currentSpendItem.spend"
                v-show="item.id === currentSpendItem.id"
              />
            </div>
          </div>
          <div class="editbar font-14">
            <div
              class="editSpend"
              v-show="item.id !== currentSpendItem.id"
              @click="currentSpendItem = JSON.parse(JSON.stringify(item))"
            >
              <i class="fas fa-pen"></i>
            </div>
            <div class="edit" v-show="item.id === currentSpendItem.id">
              <div class="cancel" @click="currentSpendItem = {}">取消</div>
              <div class="save" @click="updateSpend()">儲存</div>
            </div>
            <div
              class="deleteSpend font-16"
              v-show="item.id === currentSpendItem.id"
              @click="deleteSpend()"
            >
              <i class="fas fa-minus-square"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="formBtn">
        <div class="cancelBtn btn" @click="$emit('update:detailPopup', false)">
          {{ $t("LC_CLOSE") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["detailPopup", "currentDetail"],
  data() {
    return {
      currentSpendItem: {},
    };
  },
  methods: {
    updateSpend() {
      const data = {
        name: this.currentSpendItem.name,
        spend: this.currentSpendItem.spend,
        remark: this.currentSpendItem.remark,
        type: this.currentSpendItem.type,
        date: this.currentSpendItem.date,
        id: this.currentSpendItem.id,
      };
      this.$store
        .dispatch("spend/updateSpend", data)
        .then((res) => {
          this.$bus.$emit("sendMessage", res.message, res.state);
          this.$emit("getSpendRecord");
          this.$emit("update:detailPopup", false);
        })
        .catch((err) => this.$bus.$emit("sendMessage", err.message, err.state));
    },
    deleteSpend() {
      const data = {
        date: this.currentSpendItem.date,
        id: this.currentSpendItem.id,
      };
      this.$store
        .dispatch("spend/deleteSpend", data)
        .then((res) => {
          this.$bus.$emit("sendMessage", res.message, res.state);
          this.$emit("getSpendRecord");
          this.$emit("update:detailPopup", false);
        })
        .catch((err) => this.$bus.$emit("sendMessage", err.message, err.state));
    },
    getDate(date) {
      return moment(date).format("HH:mm:ss");
    },
    getSpendIcon(type) {
      if (type === 1) return "fas fa-utensils";
      if (type === 2) return "fas fa-gamepad";
      if (type === 3) return "fas fa-graduation-cap";
      if (type === 4) return "fas fa-comment-dots";
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.detailPopup {
  .detailCard {
    h2 {
      text-align: center;
    }
    .detailList {
      margin: 15px 0;
      padding: 20px 0;
      height: 400px;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      .detailItem {
        position: relative;
        border-radius: 5px;
        margin-bottom: 35px;
        padding: 10px 15px;
        .directions {
          display: flex;
          .remark {
            display: flex;
            flex: 1;
            input {
              flex: 1;
              padding: 0 5px;
            }
          }
          margin-bottom: 10px;
          padding-bottom: 5px;
          .spendTime {
            margin-right: 30px;
          }
        }
        .info {
          display: flex;
          align-items: center;
          padding: 5px 0;
          .type {
            color: #5e94c3;
            margin-right: 15px;
            width: 20px;
          }
          .name {
            margin-right: auto;
            flex: 1;
          }
          .spend {
            flex: 1;
          }
        }
        .editbar {
          position: absolute;
          padding: 0 5px;
          width: 100%;
          left: 0;
          top: -20px;
          display: flex;
          justify-content: space-between;
          .edit {
            display: flex;
            .cancel {
              margin-right: 10px;
            }
          }
          .deleteSpend {
            color: #ff7d7d;
          }
        }
      }
    }
  }
  input {
    border: none;
    width: 100%;
  }
}
</style>