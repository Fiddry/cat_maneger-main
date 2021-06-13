<template>
  <el-dialog v-model="dialogVisible" width="30%" :before-close="handleClose">
    <data-table
      ref="dataTable"
      @selectedItems="selectedItems"
      :tableData="tableData"
      :titles="titles"
    ></data-table>
    <el-button @click="confirm">确认采购单</el-button>
    <el-button @click="complete">完成采购</el-button>
  </el-dialog>
</template>

<script>
import { ElMessage } from "element-plus";
import dataTable from "../components/table.vue";
export default {
  props: ["orderData"],
  components: {
    dataTable,
  },

  data() {
    return {
      titles: ["名称"],
      dialogVisible: true,
      tableData: this.$props.orderData,
    };
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
    confirm() {
      ElMessage.success({
        message: "已成功添加到采购单，并打印  ",
        type: "success",
      });
      (this.$store.state.orderData = this.$refs.dataTable.dataItems),
        this.$emit("close");
    },
    complete() {
      ElMessage.success({
        message: "完成采购",
        type: "success",
      });
      this.$refs.dataTable.dataItems = [];
      (this.$store.state.orderData = this.$refs.dataTable.dataItems),
        this.$emit("confirmClose");
    },
  },
};
</script>

<style></style>
