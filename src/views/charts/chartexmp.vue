<template>
  <v-chart :options="chartconfig()"></v-chart>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import vChart from "../../components/Chart.vue";

// eslint-disable-next-line no-unused-vars
import chartconfig from "./chartoption.js";
</script>

<style lang="scss" scoped></style>
