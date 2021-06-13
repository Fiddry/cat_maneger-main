<template>
  <el-card>
    <cat-table :tableData="catData"></cat-table>
  </el-card>
</template>

<script>
import catTable from "./components/catTable.vue";
export default {
  components: {
    catTable,
  },
  data() {
    return {
      catData: this.$store.state.cat,
    };
  },
};
</script>

<style></style>
