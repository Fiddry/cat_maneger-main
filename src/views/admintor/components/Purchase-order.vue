<template>
  <el-dialog v-model="dialogVisible" width="30%" :before-close="handleClose">
    <data-table
      ref="dataTable"
      @selectedItems="selectedItems"
      :tableData="tableData"
      :titles="title"
    ></data-table>
    <el-button @click="confirm">确认采购单</el-button>
    <el-button @click="complete">完成采购</el-button>
  </el-dialog>
</template>

<script>
import { ElMessage } from "element-plus";
import dataTable from "../components/table.vue";
import axios from "axios";
export default {
  props: ["orderData"],
  components: {
    dataTable,
  },

  created() {
    // console.log("object :>> ", this.$props.orderData);
    this.$props.orderData.forEach((item) => {
      item.number = 10;
    });
  },
  data() {
    return {
      title: ["itemsName"],
      dialogVisible: true,
      // tableData: this.$props.orderData,
      addPurchase: [],
    };
  },
  computed: {
    tableData() {
      return this.$props.orderData;
    },
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },

    confirm() {
      (this.$store.state.orderData = this.$refs.dataTable.dataItems),
        this.$store.state.orderData.forEach((item) => {
          // console.log("item.number :>> ", item.number);
          axios.post("/api/merchandisePurchase/addPurchase/", {
            goodsID: item.goodsID,
            itemID: item.itemsID,
            buyingQuantity: item.number,
          });
        });
      ElMessage.success({
        message: "已成功添加到采购单，并打印  ",
        type: "success",
      });
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
