<template>
  <div>
    <el-card>
      <template #header>
        <div>
          <span><slot>物品单</slot></span>
        </div>
      </template>
      <el-table :data="dataitems">
        <template v-for="(item, index) in dataitems" :key="index">
          <el-table-column
            :label="this.itemsName[index]"
            :prop="this.itemsName[index]"
          >
          </el-table-column>
        </template>
      </el-table>
      <el-button @click="tip(scope)">添加到采购单</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  props: [ "dataItems"],
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
    handleEdit(index, row) {
      console.log(index, row);
    },
  },
};
</script>

<style></style>
