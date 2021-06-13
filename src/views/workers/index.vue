<template>
  <div>
    <workerTable :tableData="data"></workerTable>
  </div>
</template>

<script>
import workerTable from "./components/workerTable.vue";
export default {
  components: {
    workerTable,
  },
  data(){
      return{
          data:this.$store.state.workers
      }
  }
};
</script>

<style></style>
