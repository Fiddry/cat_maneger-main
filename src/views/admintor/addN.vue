<template>
  <div>
    <el-card>
      <template #header>
        <div>
          <span><slot>物品单</slot></span>
        </div>
      </template>
      <table :data="dataitems">
        <template>
          <table-item-column
            label="{itemsName[scope.$index]}"
            prop="{itemsName[scope.$index]}"
          ></table-item-column>
        </template>
      </table>
      <el-button @click="tip(scope)">添加到采购单</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ["dataItems"],
  created() {
    console.log(this.dataitems[0]["goodsname"]);

    for (let i in this.dataitems[0]) {
      this.itemsName.push(i);
    }
    console.log(this.itemsName);
  },
  data() {
    return {
      itemsName: [],
      dataitems: this.$props.dataItems,
    };
  },
  methods: {
    tip(scope) {
      alert("物品新增成功");
      console.log(scope.$index);
    },
  },
};
</script>

<style></style>
