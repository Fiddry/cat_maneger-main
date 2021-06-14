<template>
  <el-card>
    <cat-table :tableData="catData"></cat-table>
  </el-card>
</template>

<script>
import catTable from "./components/catTable.vue";
import axios from "axios";
export default {
  created() {
    axios.get("/api/cat/catsInfo").then((response) => {
      this.$store.state.cat = response.data.data;
      this.catData = this.$store.state.cat;
      console.log(response);
    });
  },
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
