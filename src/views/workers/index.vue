<template>
  <div>
    <workerTable :tableData="data"></workerTable>
  </div>
</template>

<script>
import axios from "axios";
import workerTable from "./components/workerTable.vue";
export default {
  components: {
    workerTable,
  },
  created() {
    axios.get("/api/admin/list").then((resp) => {
      this.$store.state.workers = resp.data;
    });
  },
  data() {
    return {};
  },
  computed: {
    data() {
      return this.$store.state.workers;
    },
  },
};
</script>

<style></style>
