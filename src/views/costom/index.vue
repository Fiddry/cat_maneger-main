<template>
  <div>
    <el-button @click="this.Visible = true">预约顾客</el-button>
    <forehead
      @comeCostom="comeCostom"
      @changeVisible="changeVisible"
      :Visible="Visible"
    ></forehead>
    <el-button @click="v1 = true">新增顾客</el-button>
    <new-costom v-if="v1" @closeNew="closeNew"></new-costom>
    <el-table :data="costom">
      <el-table-column label="顾客名称" prop="name"></el-table-column>
      <el-table-column label="性别" prop="gender"></el-table-column>
      <el-table-column label="年龄" prop="age"></el-table-column>
      <el-table-column label="到店时间" prop="time"></el-table-column>
      <el-table-column label="已收费用" prop="money"></el-table-column>
      <el-table-column label="操作" align="left">
        <template #default="scope">
          <el-button @click="changBuy(scope.row)">购买</el-button>

          <el-button @click="this.Rent = true">租借</el-button>
          <rentStuf @changedrawer="changedRent" :drawer="Rent"></rentStuf>
          <el-button @click="delet(scope.row)">离店</el-button>
        </template>
      </el-table-column>
    </el-table>
    <buygoods
      @changedrawer="changedBuy"
      :costomName="this.costomName"
      v-if="Buy"
    ></buygoods>
  </div>
</template>

<script>
import forehead from "./components/forehead.vue";
import buygoods from "./components/buygoods.vue";
import rentStuf from "./components/rentStuff.vue";
import newCostom from "./components/newCostom.vue";
// import axios from "axios";
export default {
  components: {
    forehead,
    buygoods,
    rentStuf,
    newCostom,
  },
  created() {
    // axios.get("/api/cashierOrder/selectSale").then((resp) => {
    //   this.$store.state.saleData = resp.data;
    // });
  },
  data() {
    return {
      v1: false,
      Visible: false,
      Buy: false,
      Rent: false,
      costomName: "",
    };
  },
  computed: {
    costom() {
      return this.$store.state.costom;
    },
  },
  watch: {},
  methods: {
    changedBuy() {
      this.Buy = false;
    },
    changBuy(row) {
      this.Buy = true;
      this.costomName = row.name;
    },
    changedRent() {
      this.Rent = false;
    },
    changeVisible() {
      this.Visible = false;
    },
    comeCostom(rows) {
      rows.forEach((item) => {
        let c = { name: item.name.name, boughtGoods: [], rentedStuff: [] };
        this.$store.state.costomData.push(c);
        this.$store.state.costom.push(item);
      });
      this.changeVisible;
    },
    delet(row) {
      this.$confirm("确认顾客离店？")
        .then(() => {
          this.costom.pop(row.$index);
        })
        .catch(() => {});
    },
    closeNew(val) {
      if (val.name) {
        this.v1 = false;
        let c = { name: val.name, boughtGoods: [], rentedStuff: [] };
        this.$store.state.costomData.push(c);
        this.$store.state.costom.push(val);
      } else {
        this.v1 = false;
      }
    },
  },
};
</script>

<style></style>
