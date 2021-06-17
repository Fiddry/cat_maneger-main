<template>
  <el-table
    style="width: 100%"
    :data="this.dataItems"
    :height="this.$props.height"
    ref="multipleTable"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55"> </el-table-column>
    <template v-for="(name, index) in this.itemNames" :key="index">
      <el-table-column :label="name" :prop="name"></el-table-column>
    </template>
  </el-table>
</template>

<script>
export default {
  props: ["tableData", "titles", "height"],

  created() {
    if (this.$props.titles) {
      this.itemNames = this.$props.titles;
    } else {
      if (this.$props.tableData) {
        for (let i in this.dataItems[0]) {
          this.itemNames.push(i);
        }
      } else {
        this.itemNames = this.$store.state.Items;
      }
    }
    //this.$refs.multipleTable;
    // element.setAttribute("height", this.$props.height);
  },
  updated() {
    if (this.dataItems) {
      for (let i in this.dataItems[0]) {
        this.itemNames.push(i);
      }
    } else {
      this.itemNames = this.$store.state.Items;
    }

    //this.$refs.multipleTable;
    // element.setAttribute("height", this.$props.height);
  },
  computed: {
    dataItems() {
      return this.$props.tableData;
    },
  },
  data() {
    return {
      // dataItem: this.$props.tableData,
      itemNames: [],
      multipleSelection: [],
    };
  },
  watch: {
    // dataItems(val) {
    //   console.log("2 :>> ", val);
    //   return val;
    // },
    multipleSelection(val) {
      this.$emit("selectedItems", val);
    },
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    selectAll() {
      this.handleSelectionChange(this.dataItems);
    },
    reset() {
      this.$refs.multipleTable.clearSelection();
    },
  },
};
</script>

<style></style>
