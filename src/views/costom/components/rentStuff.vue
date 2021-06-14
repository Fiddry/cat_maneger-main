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
    <div style="text-align:center"><span>已租物品</span></div>
    <data-table
      ref="dataRent"
      @selectedItems="selectedItems"
      :tableData="rentedStuff"
    ></data-table>
    <el-button @click="backRent">归还物品</el-button>
    <el-button @click="getRid">物品已损坏</el-button>
  </el-drawer>
</template>

<script>
import dataTable from "../../../components/table.vue";
import { ElMessage } from "element-plus";
export default {
  props: ["drawer"],
  components: {
    dataTable,
  },
  data() {
    return {
      stuffItems: this.$store.state.stuffItems,
      rentedStuff: this.$store.state.rentedStuff,
      multipleSelection: [],
      Rented: [],
    };
  },
  computed: {},
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
      this.$confirm("确认所租物品并关闭？")
        .then(() => {
          this.multipleSelection.forEach((item) => {
            this.$store.state.rentedStuff.push(item);
          });
          this.multipleSelection = [];
          this.$emit("changedrawer");
        })
        .catch(() => {});
    },
    reset() {
      this.$refs.dataTable.reset();
      this.multipleSelection = [];
    },
    backRent() {
      this.Rented.forEach((item) => {
        this.$store.state.rentedStuff.forEach(function(val, index, arr) {
          if (item == val) {
            arr.splice(index, 1);
          }
        });
      });
    },
    getRid() {
      this.Rented.forEach((item) => {
        this.$store.state.rentedStuff.forEach(function(val, index, arr) {
          if (item == val) {
            arr.splice(index, 1);
          }
        });
      });
      ElMessage.warning({
        message: "损坏物品已删除",
        type: "warning",
      });
    },
    selectedItems(val) {
      this.Rented = val;
    },
  },
};
</script>

<style></style>
