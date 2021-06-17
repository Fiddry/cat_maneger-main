<template>
  <div>
    <el-affix :offset="120">
      <el-button @click="this.openOrder = true">打开待采购单</el-button>
    </el-affix>
    <purchase-order
      v-if="openOrder"
      :orderData="SelectedItems"
      @confirmClose="confirmClose"
      @close="closeOrder"
    ></purchase-order>
    <el-row>
      <el-col :offset="2" :span="9">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>猫咪服饰</span>
            </div>
          </template>
          <data-table
            ref="catClo"
            @selectedItems="changeSelectcatClo"
            :tableData="catClo"
            :height="height"
          ></data-table>
        </el-card>
      </el-col>
      <el-col :offset="2" :span="9">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>猫咪食品</span>
            </div>
          </template>
          <data-table
            ref="catFood"
            @selectedItems="changeSelectcatFood"
            :tableData="catFood"
            :height="height"
          ></data-table>
        </el-card>
      </el-col>
      <el-col :offset="2" :span="9">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>原料类</span>
            </div>
          </template>
          <data-table
            ref="rawMaterial"
            @selectedItems="changeSelectrawMaterial"
            :tableData="rawMaterial"
            :height="height"
          ></data-table>
        </el-card>
      </el-col>
      <el-col :offset="2" :span="9">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>商品类</span>
            </div>
          </template>
          <data-table
            ref="saleGoods"
            @selectedItems="changeSelectsaleGoods"
            :tableData="saleGoods"
            :height="height"
          ></data-table>
        </el-card>
      </el-col>
      <el-col :offset="2" :span="9">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>猫咪玩具类</span>
            </div>
          </template>
          <data-table
            ref="catToys"
            @selectedItems="changeSelectcatToys"
            :tableData="catToys"
            :height="height"
          ></data-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import dataTable from "../../components/table.vue";
import purchaseOrder from "./components/Purchase-order.vue";
import { useStore } from "vuex";
// import { init } from "echarts/core";
// import { ref } from "vue";
export default {
  components: {
    dataTable,
    purchaseOrder,
  },
  setup() {
    const store = useStore();
    axios.get("/api/catApparel/list").then((resp) => {
      store.state.catClo = resp.data;
    });
    axios.get("/api/catFood/list").then((resp) => {
      // console.log("resp.data :>> ", resp.data);
      store.state.catFood = resp.data;
    });
    axios.get("/api/rawMaterial/list").then((resp) => {
      // console.log("resp.data :>> ", resp.data);
      store.state.rawMaterial = resp.data;
    });
    axios.get("/api/saleGoods/list").then((resp) => {
      // console.log("resp.data :>> ", resp.data);
      store.state.saleGoods = resp.data;
    });
    axios.get("/api/catToys/selectToys").then((resp) => {
      // console.log("resp.data :>> ", resp.data);
      store.state.catToys = resp.data;
    });
  },
  data() {
    return {
      height: "300px",
      openOrder: false,
      selectedGoods: [],
      selectCatProducts: [],
      selectedcatClo: [],
      selectedcatFood: [],
      selectedrawMaterial: [],
      selectedsaleGoods: [],
      selectedcatToys: [],
    };
  },
  computed: {
    SelectedItems() {
      return this.selectedcatClo.concat(
        this.selectedcatFood.concat(
          this.selectedrawMaterial.concat(
            this.selectedsaleGoods.concat(this.selectedcatToys)
          )
        )
      );
    },

    catClo() {
      return this.$store.state.catClo;
    },
    catFood() {
      return this.$store.state.catFood;
    },
    rawMaterial() {
      return this.$store.state.rawMaterial;
    },
    saleGoods() {
      return this.$store.state.saleGoods;
    },
    catToys() {
      return this.$store.state.catToys;
    },
  },

  methods: {
    tip() {
      alert("物品新增成功");
    },

    changeSelectcatClo(val) {
      this.selectedcatClo = val;
    },
    changeSelectcatFood(val) {
      this.selectedcatFood = val;
    },
    changeSelectrawMaterial(val) {
      this.selectedrawMaterial = val;
    },
    changeSelectsaleGoods(val) {
      this.selectedsaleGoods = val;
    },
    changeSelectcatToys(val) {
      this.selectedcatToys = val;
    },
    confirmClose() {
      this.selectedGoods = [];
      this.selectCatProducts = [];
      this.$refs.goods.reset();
      this.$refs.catFood.reset();
      this.openOrder = false;
    },
    closeOrder() {
      this.openOrder = false;
    },
  },
};
</script>

<style></style>
