<template>
  <div>
    <el-row>
      <el-col :span="6">
        <add :dataItems="dataitems">销售商品</add>
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
      dataitems: [
        { goodsname: "旺仔小馒头", price: 2, numbers: 0 },
        { goodsname: "旺仔小馒头", price: 2, numbers: 0 },
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
