<template>
  <div>
    <el-button @click="this.Visible = true">预约顾客</el-button>
    <forehead
      @comeCostom="comeCostom"
      @changeVisible="changeVisible"
      :Visible="Visible"
    ></forehead>
    <el-table :data="costom">
      <el-table-column label="顾客名称" prop="name"></el-table-column>
      <el-table-column label="性别" prop="gender"></el-table-column>
      <el-table-column label="年龄" prop="age"></el-table-column>
      <el-table-column label="到店时间" prop="time"></el-table-column>
      <el-table-column label="已收费用" prop="money"></el-table-column>
      <el-table-column label="操作" align="left">
        <template #default="scope">
          <el-button @click="this.Buy = true">购买</el-button>
          <buygoods @changedrawer="changedBuy" :drawer="Buy"></buygoods>
          <el-button @click="this.Rent = true">租借</el-button>
          <rentStuf @changedrawer="changedRent" :drawer="Rent"></rentStuf>
          <el-button @click="delet(scope.row)">离店</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import forehead from "./components/forehead.vue";
import buygoods from "./components/buygoods.vue";
import rentStuf from "./components/rentStuff.vue";
export default {
  components: {
    forehead,
    buygoods,
    rentStuf,
  },
  data() {
    return {
      Visible: false,
      Buy: false,
      Rent: false,
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
    changedRent() {
      this.Rent = false;
    },
    changeVisible() {
      this.Visible = false;
    },
    comeCostom(rows) {
      rows.forEach((item) => {
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
  },
};
</script>

<style></style>
