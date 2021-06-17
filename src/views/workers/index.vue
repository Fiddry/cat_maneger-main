<template>
  <div>
    <workerTable :titles="title" :tableData="data"></workerTable>
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
    axios.get("/api/employ/list").then((resp) => {
      this.$store.state.workers = resp.data;
    });
  },
  // updated() {
  //   axios.get("/api/employ/list").then((resp) => {
  //     this.$store.state.workers = resp.data;
  //   });
  // },
  data() {
    return {
      title: ["employID","employName"],
    };
  },
  computed: {
    data() {
      return  this.$store.state.workers;
    },
  },
};
</script>

<style></style>
