<template>
  <div>
    <el-row>
      <el-col :span="6">
        <add :dataItems="goodsitems">销售商品</add>
      </el-col>
      <el-col :offset="2" :span="6">
        <add :dataItems="foodsitems">猫咪食品</add>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import add from "./addN.vue";
export default {
  components: {
    add,
  },
  data() {
    return {
      goodsitems: [
        { 商品名称: "旺仔小馒头", 单价: 2, 剩余数量: 2 },
        { 商品名称: "旺仔小馒头", 单价: 2, 剩余数量: 0 },
      ],
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
  methods: {
    tip() {
      alert("物品新增成功");
    },
  },
};
</script>

<style></style>
