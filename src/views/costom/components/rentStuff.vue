<template>
  <el-drawer
    title="商品"
    v-model="v"
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
  props: ["costomName"],
  created() {
    axios.get("/api/catToys/selectToys").then((res) => {
      this.$store.state.stuffItems = res.data;
    });
  },
  mounted() {
    this.getCostomData();
  },
  components: {
    dataTable,
  },
  data() {
    return {
      v: true,
      multipleSelection: [],
      selectedRented: [],
      title: ["itemsName"],
      costomData: 0,
    };
  },
  computed: {
    stuffItems() {
      return this.$store.state.stuffItems;
    },
    rentedStuff() {
      return this.$store.state.costomData[this.costomData].rentedStuff;
    },
  },
  methods: {
    getCostomData() {
      let cs = this.$store.state.costomData;
      for (let i = 0; i < cs.length; i++) {
        if (cs[i].name == this.$props.costomName) {
          this.costomData = i;
        }
      }
    },
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
            this.$store.state.costomData[this.costomData].rentedStuff.push(
              item
            );
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
      Array.prototype.add = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
          this[index].remindNumber++;
        }
      };
      this.selectedRented.forEach((i) => {
        console.log("i :>> ", i);
        this.$store.state.costomData[this.costomData].rentedStuff.forEach(
          (item) => {
            console.log("itma :>> ", item);
            if (item.itemsName == i.itemsName) {
              this.$store.state.costomData[this.costomData].rentedStuff.add(i);
              this.$store.state.costomData[this.costomData].rentedStuff.remove(
                i
              );
            }
          }
        );
      });
    },
    getRid() {
      this.selectedRented.forEach((item) => {
        this.$store.state.costomData[this.costomData].rentedStuff.forEach(
          function(val, index, arr) {
            if (item == val) {
              arr.splice(index, 1);
            }
          }
        );
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
