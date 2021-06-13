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
      @selectedItems="changestuffItems"
      :tableData="stuffItems"
    ></data-table>
    <el-button @click="confirm">确认</el-button>
    <el-button @click="reset">重置</el-button>
  </el-drawer>
</template>

<script>
import dataTable from "../../../components/table.vue";
export default {
  props: ["drawer"],
  components: {
    dataTable,
  },

  // setup() {
  //   updated(() => {});
  // },

  data() {
    return {
      stuffItems: [
        {
          物品名称: "逗猫激光笔",
          租金: 20,
          剩余数量: 2,
        },
      ],
      multipleSelection: [],
    };
  },

  methods: {
    changestuffItems(val) {
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
      this.$confirm("确认关闭？")
        .then(() => {
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
