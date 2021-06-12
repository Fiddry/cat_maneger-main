<template>
  <div class="container" ref="container"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, defineProps, onMounted, toRefs, watch } from "vue";
const props = defineProps({
  options: {
    required: true,
    type: Object,
    default: {},
  },
});
const { options } = toRefs(props);
const container = ref(null);
const chart = ref(null);
onMounted(() => {
  const chart = echarts.init(container.value, "dark");
  chart.setOption(props.options);
  chart.value = echarts.init(container.value);
  chart.value.setOption(props.options);
});
watch(
  options,
  (newOptions) => {
    chart.value.setOption(newOptions);
  },
  { deep: true }
);
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
