<template>
  <el-row>
    <el-col :span="24">
      <data-table :tableData="this.data"></data-table>
    </el-col>
  </el-row>
</template>

<script>
import axios from "axios";
import dataTable from "../../components/table.vue";
export default {
  components: {
    dataTable,
  },
  created() {
    axios.get("/api/cat/info").then((resp) => {
      this.data = resp.data;
    });
  },
  data() {
    return {
      data: [],
    };
  },
};
</script>

<style></style>
