<template>
  <div>
    <el-button @click="this.openOrder = true">打开待采购单</el-button>
    <purchase-order
      v-if="openOrder"
      :orderData="SelectedItems"
      @close="closeOrder"
    ></purchase-order>
    <el-row>
      <el-col :span="6">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>商品单</span>
            </div>
          </template>
          <data-table
            @selectedItems="changeSelectGoods"
            :tableData="goodsItems"
          ></data-table>
        </el-card>
      </el-col>
      <el-col :offset="2" :span="6">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>猫咪商品单</span>
            </div>
          </template>
          <data-table
            @selectedItems="changeSelectFoods"
            :tableData="catFoodsItems"
          ></data-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import dataTable from "../../components/table.vue";
import purchaseOrder from "./components/Purchase-order.vue";
export default {
  components: {
    dataTable,
    purchaseOrder,
  },
  data() {
    return {
      openOrder: false,
      goodsItems: this.$store.state.goodsItems,
      catFoodsItems: this.$store.state.catFoodsItems,
      selectedGoods: [],
      selectCatFoods: [],
    };
  },
  computed: {
    SelectedItems() {
      let items = [];
      this.selectedGoods.forEach((item) => {
        items.push(item);
      });
      this.selectCatFoods.forEach((item) => {
        items.push(item);
      });
      console.log(this.items);
      return items;
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
    changeSelectFoods(val) {
      this.selectCatFoods = val;
    },
    closeOrder() {
      this.openOrder = false;
    },
  },
};
</script>

<style></style>
