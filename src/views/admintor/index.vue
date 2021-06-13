<template>
  <div>
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
            :tableData="goodsitems"
          ></data-table>
          <el-button @click="submitChangeGoods">添加到采购单</el-button>
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
            :tableData="foodsitems"
          ></data-table>
          <el-button @click="submitChangeFoods">添加到采购单</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import dataTable from "../../components/table.vue";
export default {
  components: {
    dataTable,
  },
  data() {
    return {
      goodsitems: [
        { 商品名称: "旺仔小馒头", 单价: 2, 剩余数量: 2 },
        { 商品名称: "可口可乐", 单价: 3, 剩余数量: 130 },
      ],
      selectedGoods: [],
      foodsitems: [
        {
          名称: "小鱼干",
          进价: 2,
          剩余数量: 20,
        },
        {
          名称: "猫粮",
          进价: 20,
          剩余数量: 20,
        },
      ],
    };
  },
  watch: {
    selectedGoods(val) {
      console.log(val);
    },
  },
  methods: {
    tip() {
      alert("物品新增成功");
    },

    changeSelectGoods(val) {
      this.selectedGoods = val;
    },
    submitChangeGoods() {
      console.log(this.selectedGoods);
    },
    changeSelectFoods(val) {
      this.selectedGoods = val;
    },
    submitChangeFoods() {
      console.log(this.selectedGoods);
    },
  },
};
</script>

<style></style>
