<template>
  <el-dialog
    title="预约顾客"
    v-model="this.$props.Visible"
    @close="changeVisible"
  >
    <data-table
      :tableData="foreCostom"
      @selectedItems="changeComedCostom"
    ></data-table>
    <el-button @click="come">到店</el-button>
  </el-dialog>
</template>

<script>
import dataTable from "../../../components/table.vue";
export default {
  props: ["Visible"],

  components: {
    dataTable,
  },
  data() {
    return {
      multipleSelection: [],
    };
  },
  computed: {
    foreCostom() {
      return this.$store.state.foreCostom;
    },
  },
  methods: {
    changeVisible() {
      this.$emit("changeVisible");
    },
    changeComedCostom(val) {
      this.multipleSelection = val;
    },
    come() {
      Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
          this.splice(index, 1);
        }
      };
      this.$emit("comeCostom", this.multipleSelection);
      this.multipleSelection.forEach((item) => {
        this.$store.state.foreCostom.remove(item);
      });
      //  this.$store.state.rentedStuff.forEach(function(val, index, arr){} ,
      this.multipleSelection = [];
    },
  },
};
</script>

<style></style>
