<template>
  <el-drawer
    title="商品"
    v-model="this.$props.drawer"
    :with-header="false"
    :before-close="handleClose"
    destroy-on-close
  >
    <span>套餐</span>
    <data-table
      ref="dataTable"
      @selectedItems="changeBuyAdmission"
      :tableData="admission"
      :height="height"
    ></data-table>

    <span>猫咪食品</span>

    <data-table
      ref="dataTable"
      @selectedItems="changeBuySaleGoods"
      :tableData="saleGoods"
      :height="height"
    ></data-table>

    <span>饮品甜点</span>
    <data-table
      ref="dataTable"
      @selectedItems="changeBuyDrinks"
      :tableData="drinks"
      :height="height"
    ></data-table>
    <el-button @click="confirm">确认</el-button>
    <el-button @click="reset">重置</el-button>
    <div style="text-align:center"><span>已买物品</span></div>
    <data-table :tableData="boughtGoods"></data-table>
  </el-drawer>
</template>

<script>
import dataTable from "../../../components/table.vue";
import axios from "axios";
import { ElMessage } from "element-plus";

export default {
  props: ["drawer"],
  components: {
    dataTable,
  },
  created() {
    axios.get("/api/goods/selectGS").then((res) => {
      this.$store.state.saleGoods = res.data;
    });
    axios.get("/api/goods/selectGD").then((res) => {
      this.$store.state.drinks = res.data;
    });
    axios.get("/api/goods/selectGA").then((res) => {
      this.$store.state.admission = res.data;
    });
  },
  data() {
    return {
      Admission: [],
      SaleGoods: [],
      Drinks: [],
      Selection: [],
      height: "150px",
    };
  },
  computed: {
    boughtGoods() {
      return this.$store.state.boughtGoods;
    },

    saleGoods() {
      return this.$store.state.saleGoods;
    },
    admission() {
      return this.$store.state.admission;
    },
    drinks() {
      return this.$store.state.drinks;
    },
    multipleSelection() {
      return this.Admission.concat(this.SaleGoods.concat(this.Drinks));
    },
  },
  methods: {
    changeBuyAdmission(val) {
      this.Admission = val;
    },
    changeBuySaleGoods(val) {
      this.SaleGoods = val;
    },
    changeBuyDrinks(val) {
      this.Drinks = val;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          this.$emit("changedrawer");
          done();
        })
        .catch(() => {});
    },

    confirm() {
      this.$confirm("确认购买？")
        .then(() => {
          this.multipleSelection.forEach((item) => {
            this.$store.state.boughtGoods.push(item);
            console.log("item :>> ", item.goodsID);
            axios.put("/api/goods/backID" + item.goodsID);
            axios.get("/api/cashierOrder/selectSale").then((resp) => {
              this.$store.state.saleData = resp.data;
            });
            ElMessage.success("购买成功");
          });
          this.$emit("changedrawer");
        })
        .catch(() => {});
    },
    reset() {
      this.$refs.dataTable.reset();
      this.multipleSelection = [];
    },
  },
};
</script>

<style>
span {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>
