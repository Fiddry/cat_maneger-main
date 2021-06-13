<template>
  <el-drawer
    title="商品"
    v-model="this.$props.drawer"
    :with-header="false"
    :before-close="handleClose"
    destroy-on-close
  >
    <data-table
      ref="dataTable"
      @selectedItems="changeBuyGoods"
      :tableData="goodsItems"
    ></data-table>
    <el-button @click="confirm">确认</el-button>
    <el-button @click="reset">重置</el-button>
    <div style="text-align:center"><span>已买物品</span></div>
    <data-table :tableData="boughtGoods"></data-table>
  </el-drawer>
</template>

<script>
import dataTable from "../../../components/table.vue";
export default {
  props: ["drawer"],
  components: {
    dataTable,
  },
  data() {
    return {
      goodsItems: this.$store.state.goodsItems,
      boughtGoods: this.$store.state.boughtGoods,
      multipleSelection: [],
    };
  },
  computed: {},
  methods: {
    changeBuyGoods(val) {
      this.multipleSelection = val;
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
            this.$store.state.boughtItems.push(item);
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

<style></style>
