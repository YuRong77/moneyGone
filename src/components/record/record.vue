<template>
  <div class="record">
    <div class="header">
      <div class="changeMonthBtn" @click="changeMonth(-1)">
        <i class="fas fa-angle-left"></i>
      </div>
      <div class="recordMonth">
        <h3 class="font-14">{{ $t("LC_SPEND_RECORD") }}</h3>
        <div class="currentMonth font-18">{{ currentMonth }}</div>
      </div>
      <div class="changeMonthBtn" @click="changeMonth(1)">
        <i class="fas fa-angle-right"></i>
      </div>
    </div>
    <div class="recordList">
      <div class="list">
        <div
          class="recordItem boxShadow btn"
          v-for="(item, index) in spendList"
          :key="index"
          @click="openDetail(item.date, item.details)"
        >
          <div class="date font-16">{{ item.date }}</div>
          <div class="total font-16">
            {{ $t("LC_TOTAL") }}: {{ item.total }}
          </div>
          <div class="detail confirmBtn font-16">
            {{ $t("LC_DETAIL") }}
          </div>
        </div>
      </div>
      <div class="emptyList" v-if="spendList.length === 0 && !isLoading">
        <div>
          <img src="@/assets/img/empty_street.svg" alt="" />
          <h3 class="font-16">{{ $t("LC_EMPTY_LIST") }}</h3>
        </div>
      </div>
    </div>
    <div class="addSpendBtn btn" @click="addSpendPopup = true">
      <i class="far fa-edit"></i>
    </div>
    <DetailPopup
      v-if="detailPopup"
      :detailPopup.sync="detailPopup"
      :currentDetail="currentDetail"
      @getSpendRecord="getSpendRecord"
    />
    <AddSpendPopup
      v-if="addSpendPopup"
      :addSpendPopup.sync="addSpendPopup"
      @getSpendRecord="getSpendRecord"
    />
  </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";
import DetailPopup from "@/components/popup/detailPopup";
import AddSpendPopup from "@/components/popup/addSpendPopup";
export default {
  components: {
    DetailPopup,
    AddSpendPopup,
  },
  data() {
    return {
      currentMonth: moment().format("YYYY-MM"),
      currentDetail: null,
      detailPopup: false,
      addSpendPopup: false,
    };
  },
  watch: {
    currentMonth() {
      this.getSpendRecord();
    },
  },
  computed: {
    ...mapState("spend", ["spendList"]),
    ...mapState("memberInfo", ["isLoading"]),
  },
  methods: {
    getSpendRecord() {
      const data = {
        startDate: moment(this.currentMonth)
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: moment(this.currentMonth).endOf("month").format("YYYY-MM-DD"),
      };
      this.$store
        .dispatch("spend/getSpendRecord", data)
        .catch((err) => this.$bus.$emit("sendMessage", err.message, err.state));
    },
    changeMonth(val) {
      this.currentMonth = moment(this.currentMonth)
        .add(val, "M")
        .format("YYYY-MM");
    },
    openDetail(_date, _list) {
      this.currentDetail = {
        date: _date,
        list: _list,
      };
      this.detailPopup = true;
    },
  },
  created() {
    this.getSpendRecord();
  },
};
</script>

<style lang="scss" scoped>
.record {
  display: flex;
  flex-direction: column;
  .header {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    height: 85px;
    .changeMonthBtn {
      width: 50px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .recordMonth {
      flex: 1;
      text-align: center;
      h3 {
        margin-bottom: 5px;
      }
      .currentMonth {
        margin-bottom: 5px;
        font-weight: bold;
      }
    }
  }
  .recordList {
    flex: 1;
    position: relative;
    .list {
      padding: 5%;
      @media (max-height: 800px) and (min-width: 900px) {
        padding: 2%;
      }
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      .recordItem {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 55px;
        border-radius: 10px;
        margin-bottom: 15px;
        .date {
          font-weight: bold;
        }
        .detail {
          padding: 5px 10px;
          border-radius: 5px;
        }
      }
    }
    .emptyList {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      text-align: center;
      border-radius: 20px;
      img {
        margin-bottom: 20px;
      }
    }
  }
  .addSpendBtn {
    position: absolute;
    bottom: calc(2% + 95px);
    right: 4%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ffd744, #ffd151);
    box-shadow: 0 8px 16px 0 #c3ae7282, inset -2px -4px 2px 0 #d5c39363,
      inset 0 2px 1px 0 #fff2cdc9;
    color: white;
  }
}
</style>