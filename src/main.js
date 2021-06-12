import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import installElementPlus from "./plugins/element";
import "./assets/css/icon.css";
import { VueEcharts } from "vue3-echarts";
const app = createApp(App);
// import "echarts-gl";
installElementPlus(app);
import "echarts-gl";
app
  .use(VueEcharts)
  .use(store)
  .use(router)
  .mount("#app");
