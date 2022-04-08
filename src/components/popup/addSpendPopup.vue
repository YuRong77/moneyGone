<template>
  <div class="addSpendPopup popupMask">
    <div class="addSpendCard p-card-s boxShadow">
      <h3 class="font-18">{{ $t("LC_ADD_SPEND") }}</h3>
      <div class="spendForm">
        <div class="datePicker font-14">
          <label for="date" @click="$refs.date.showPicker()">{{
            $t("LC_DATE")
          }}</label>
          <h4 class="date font-16" @click="$refs.date.showPicker()">
            {{ date }}
          </h4>
          <input type="date" id="date" ref="date" v-model="date" required />
        </div>
        <div class="typeList">
          <div
            class="typeItem"
            :class="{ active: item.value === type }"
            v-for="item in typeList"
            :key="item.value"
            @click="type = item.value"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="inputBox">
          <label for="name">{{ $t("LC_NAME") }}</label>
          <input class="inputBox" type="text" id="name" v-model="name" />
        </div>
        <div class="inputBox">
          <label for="spend">{{ $t("LC_AMOUNT") }}</label>
          <input
            class="inputBox"
            type="tel"
            id="spend"
            ref="spend"
            v-model.number="spend"
          />
        </div>
        <div class="inputBox">
          <label for="remark">{{ $t("LC_REMARK") }}</label>
          <input class="inputBox" type="text" id="remark" v-model="remark" />
        </div>
      </div>
      <div class="formBtn">
        <div class="cancelBtn btn" @click="closeSpend()">
          {{ $t("LC_CLOSE") }}
        </div>
        <div class="confirmBtn btn" @click="addSpend()">{{ $t("LC_ADD") }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["addSpendPopup", "getSpendRecord"],
  data() {
    return {
      date: moment().format("YYYY-MM-DD"),
      name: null,
      spend: null,
      remark: null,
      type: 1,
      typeList: [
        { name: this.$t("LC_LIFE"), value: 1 },
        { name: this.$t("LC_FUN"), value: 2 },
        { name: this.$t("LC_STUDY"), value: 3 },
        { name: this.$t("LC_OTHER"), value: 4 },
      ],
    };
  },
  methods: {
    addSpend() {
      const data = {
        name: this.name,
        spend: this.spend,
        remark: this.remark,
        type: this.type,
        date: this.date,
      };
      this.$store
        .dispatch("spend/addSpend", data)
        .then((res) => this.$bus.$emit("sendMessage", res.message, res.state))
        .catch((err) => this.$bus.$emit("sendMessage", err.message, err.state));
      this.$emit("getSpendRecord");
      this.closeSpend();
    },
    closeSpend() {
      this.$emit("update:addSpendPopup", false);
    },
  },
  created() {},
};
</script>

<style  lang="scss" scoped>
.addSpendPopup {
  .addSpendCard {
    h3 {
      text-align: center;
      margin-bottom: 20px;
    }
    .spendForm {
      margin-bottom: 10px;
      .datePicker {
        border-bottom: rgba(0, 0, 0, 0.1) solid 1px;
        margin-bottom: 10px;
        label {
          display: block;
          margin-bottom: 5px;
        }
        #date {
          display: none;
        }
      }
      .typeList {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        .typeItem {
          background: #f2f4f8;
          box-shadow: 0 2px 2px rgb(214 214 214 / 50%);
          color: rgba(0, 0, 0, 0.6);
          border-radius: 5px;
          padding: 5px 15px;
          &.active {
            background: #5e94c3;
            color: white;
          }
        }
      }
    }
  }
}
</style>