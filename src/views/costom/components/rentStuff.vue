<template>
  <div>
    <el-drawer
      title="租借物品"
      v-model="this.$props.drawer"
      :with-header="false"
      :before-close="handleClose"
      destroy-on-close
    >
      <el-table
        :data="tableData"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
        style="width:100%"
        show-summary
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="物品名称" prop="name"></el-table-column>
        <el-table-column label="押金" prop="rent_money"></el-table-column>
        <el-table-column label="租借个数" prop="numbers"> </el-table-column>
      </el-table>
      <el-button @click="confirm()">确认</el-button>
      <el-button @click="reset">重置</el-button>
    </el-drawer>
  </div>
</template>

<script>
export default {
  props: ["drawer"],
  data() {
    return {
      tableData: [
        {
          name: "逗猫激光笔",
          rent_money: "30",
          numbers: "1",
        },
      ],
      multipleSelection: [],
    };
  },

  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          this.$emit("changedrawer");
          done();
        })
        .catch(() => {});
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    confirm() {
      this.$confirm("确认关闭？")
        .then(() => {
          this.$emit("changedrawer");
        })
        .catch(() => {});
    },
    reset() {
      console.log("重置");
    },
  },
};
</script>

<style></style>
