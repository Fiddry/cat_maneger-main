<template>
  <div>
    <v-chart>今日销售商品</v-chart>
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
  beforeCreate() {
    axios.get("/api/cashierOrder/selectSale").then((resp) => {
      console.log("resp.data1 :>> ", resp.data);
      this.$store.state.saleData = resp.data;
    });
  },
 
};
</script>

<style></style>
