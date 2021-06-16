<template>
  <div>
    <el-button @click="this.openOrder = true">打开待采购单</el-button>
    <purchase-order
      v-if="openOrder"
      :orderData="SelectedItems"
      @confirmClose="confirmClose"
      @close="closeOrder"
    ></purchase-order>
    <el-row>
      <el-col :span="7">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>商品单</span>
            </div>
          </template>
          <data-table
            ref="goods"
            @selectedItems="changeSelectGoods"
            :tableData="goodsItems"
          ></data-table>
        </el-card>
      </el-col>
      <el-col :offset="2" :span="8">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>猫咪商品单</span>
            </div>
          </template>
          <data-table
            ref="catProducts"
            @selectedItems="changeSelectCatProducts"
            :tableData="catProducts"
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
export default {
  components: {
    dataTable,
    purchaseOrder,
  },
  created() {
    axios.get("/api/goods/list").then((resp) => {
      this.$store.state.goodsItems = resp.data;
    });
    axios.get("/api/catProducts/list").then((resp) => {
      this.$store.state.catProducts = resp.data;
    });
  },
  data() {
    return {
      openOrder: false,
      selectedGoods: [],
      selectCatProducts: [],
    };
  },
  computed: {
    SelectedItems() {
      return this.selectedGoods.concat(this.selectCatProducts);
    },
    goodsItems() {
      return this.$store.state.goodsItems;
    },
    catProducts() {
      return this.$store.state.catProducts;
    },
  },
  watch: {
    // SelectedItems(val) {
    //   console.log(val);
    // },
  },
  methods: {
    tip() {
      alert("物品新增成功");
    },

    changeSelectGoods(val) {
      this.selectedGoods = val;
    },
    changeSelectCatProducts(val) {
      this.selectCatProducts = val;
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
