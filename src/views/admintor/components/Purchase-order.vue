<template>
  <el-dialog v-model="dialogVisible" width="30%" :before-close="handleClose">
    <data-table
      ref="dataTable1"
      @selectedItems="selectedItems"
      :tableData="tableData"
      :titles="titles"
    ></data-table>
    <el-button @click="confirm">确认采购单</el-button>
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
  beforeMounted() {
    this.$refs.dataTable1.selectAll();
  },
  data() {
    return {
      titles: ["名称"],
      dialogVisible: true,
      tableData: this.$props.orderData,
      multipleSelection: [],
    };
  },
  methods: {
    selectedItems(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    handleClose() {
      this.$emit("close");
    },
    confirm() {
      ElMessage.success({
        message: "已成功添加到采购单，并打印  ",
        type: "success",
      });
    },
  },
};
</script>

<style></style>
