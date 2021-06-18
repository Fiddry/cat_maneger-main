<template>
  <h1><slot></slot></h1>
  <v-chart class="chart" :option="option" />
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, defineComponent } from "vue";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);
import { useStore } from "vuex";
// import axios from 'axios'
export default defineComponent({
  name: "HelloWorld",

  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: "dark",
  },
  data() {
    return {};
  },

  setup: function() {
    const store = useStore();

    const option = ref({
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "5%",
        left: "center",
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },

          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "40",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          // data: [
          //   { value: 1048, name: "搜索引擎" },
          //   { value: 735, name: "直接访问" },
          //   { value: 580, name: "邮件营销" },
          //   { value: 484, name: "联盟广告" },
          //   { value: 300, name: "视频广告" },
          // ],
          data: store.state.saleData,
        },
      ],
    });
    return { option };
  },
});
</script>

<style scoped>
.chart {
  height: 500px;
}
</style>
