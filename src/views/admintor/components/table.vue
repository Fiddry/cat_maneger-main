<template>
  <el-table :data="dataItems" ref="multipleTable">
    <template v-for="(name, index) in this.itemNames" :key="index">
      <el-table-column :label="name" :prop="name"></el-table-column>
    </template>

    <el-table-column label="采购数量">
      <template #default="scope">
        <el-input-number size="mini" :min="0" v-model="scope.row.number">
        </el-input-number>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ["tableData", "titles"],

  created() {
    if (this.$props.titles) {
      this.itemNames = this.$props.titles;
    } else {
      if (this.dataItems[0]) {
        for (let i in this.dataItems[0]) {
          this.itemNames.push(i);
        }
      } else {
        this.itemNames = this.$store.state.Items;
      }
    }
  },
  methods: {},
  data() {
    return {
      itemNames: [],
      dataItems: this.$props.tableData,
    };
  },
  watch: {},
  computed: {},
};
</script>

<style></style>
