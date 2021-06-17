<template>
  <div>
    <h1>今日销售记录</h1>
    <v-chart></v-chart>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import vChart from "./components/echartdemo.vue";
import axios from "axios";
export default {
  components: {
    vChart,
  },
  data() {},
  async beforeCreate() {
    await axios.get("/api/cashierOrder/selectSale").then((resp) => {
      console.log("resp.data :>> ", resp.data);
      this.$store.state.saleData = resp.data;
    });
  },
  created() {
    console.log("object1 :>> ", this.$store.state.saleData);
  },
};
</script>

<style></style>
