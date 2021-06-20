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
      :titles="title"
    ></data-table>
    <el-button @click="backRent">归还物品</el-button>
    <el-button @click="getRid">物品已损坏</el-button>
  </el-drawer>
</template>

<script>
import dataTable from "../../../components/table.vue";
import { ElMessage } from "element-plus";
import axios from "axios";
export default {
  props: ["drawer"],
  created() {
    axios.get("/api/catToys/selectToys").then((res) => {
      this.$store.state.stuffItems = res.data;
    });
  },
  components: {
    dataTable,
  },
  data() {
    return {
      multipleSelection: [],
      selectedRented: [],
      title: ["itemsName"],
    };
  },
  computed: {
    stuffItems() {
      return this.$store.state.stuffItems;
    },
    rentedStuff() {
      return this.$store.state.rentedStuff;
    },
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
      this.$confirm("确认所租物品并关闭？")
        .then(() => {
          this.multipleSelection.forEach((item) => {
            axios.post("/api/itemLeale/addRent" + item.itemsID).then(() => {});
            this.$store.state.stuffItems.forEach((i) => {
              if (i === item) {
                i.remindNumber--;
              }
            });
            this.$store.state.rentedStuff.push(item);
          });
          this.multipleSelection = [];
          // this.$emit("changedrawer");
        })
        .catch(() => {});
    },
    reset() {
      this.$refs.dataTable.reset();
      this.multipleSelection = [];
    },
    backRent() {
      Array.prototype.indexOf = function(val) {
        for (var i = 0; i < this.length; i++) {
          if (this[i] == val) return i;
        }
        return -1;
      };
      Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
          this.splice(index, 1);
        }
      };
      this.selectedRented.forEach((i) => {
        this.$store.state.rentedStuff.forEach((item) => {
          if (item.itemsName == i.itemsName) {
            item.remindNumber++;
            this.$store.state.rentedStuff.remove(i);
          }
        });
      });
    },
    getRid() {
      this.selectedRented.forEach((item) => {
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
      this.selectedRented = val;
    },
  },
};
</script>

<style></style>
