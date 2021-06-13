import { createStore } from "vuex";

export default createStore({
  state: {
    tagsList: [],
    collapse: false,
    costom: [
      {
        name: "张飞",
        gender: "男",
        age: "34",
        time: "5:30",
        money: "300",
      },
    ],
    foreCostom: [
      {
        name: "1",
        telephone: "1",
        gender: "1",
        time: "1",
        money: "1",
      },
      {
        name: "2",
        telephone: "2",
        gender: "2",
        time: "2",
        money: "2",
      },
    ],

    Items: ["物品名称", "单价", "剩余数量"],
    catFoodsItems: [
      {
        名称: "小鱼干",
        进价: 2,
        剩余数量: 210,
      },
      {
        名称: "猫粮",
        进价: 20,
        剩余数量: 20,
      },
    ],
    goodsItems: [
      {
        名称: "旺仔小馒头",
        单价: 2,
        剩余数量: 2,
      },
    ],
    boughtGoods: [],
    stuffItems: [
      {
        名称: "逗猫激光笔",
        租金: 20,
        剩余数量: 2,
      },
    ],
    rentedStuff: [],
    orderData: [],
  },
  mutations: {
    delTagsItem(state, data) {
      state.tagsList.splice(data.index, 1);
    },
    setTagsItem(state, data) {
      state.tagsList.push(data);
    },
    clearTags(state) {
      state.tagsList = [];
    },
    closeTagsOther(state, data) {
      state.tagsList = data;
    },
    closeCurrentTag(state, data) {
      for (let i = 0, len = state.tagsList.length; i < len; i++) {
        const item = state.tagsList[i];
        if (item.path === data.$route.fullPath) {
          if (i < len - 1) {
            data.$router.push(state.tagsList[i + 1].path);
          } else if (i > 0) {
            data.$router.push(state.tagsList[i - 1].path);
          } else {
            data.$router.push("/");
          }
          state.tagsList.splice(i, 1);
          break;
        }
      }
    },
    // 侧边栏折叠
    hadndleCollapse(state, data) {
      state.collapse = data;
    },
  },
  actions: {},
  modules: {},
});
