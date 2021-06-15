<template>
  <el-table
    :data="dataItems"
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
  props: ["tableData", "titles"],

  created() {
    if (this.$props.titles) {
      this.itemNames = this.$props.titles;
    } else {
      if (this.dataItems) {
        for (let i in this.dataItems[0]) {
          this.itemNames.push(i);
        }
      } else {
        this.itemNames = this.$store.state.Items;
      }
    }
  },
  data() {
    return {
      dataItems: this.$props.tableData,
      itemNames: [],
      multipleSelection: [],
    };
  },
  watch: {
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
