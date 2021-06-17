<template>
  <el-table :data="Data" style="width: 100%">
    <el-table-column type="expand">
      <template #default="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <template v-for="(item, key) in props.row" :key="key">
            <el-form-item :label="key">
              <span>:&#12288;{{ item }}&#12288;&#12288;&#12288;&#12288;&#12288;</span>
            </el-form-item>
          </template>
        </el-form>
      </template>
    </el-table-column>

    <template v-for="(item, index) in itemNames" :key="index">
      <el-table-column :label="item" :prop="item"></el-table-column>
    </template>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button @click="openEdit(scope.row)">编辑员工信息</el-button>
      </template>
    </el-table-column>
  </el-table>
  <worker-edit
    v-if="catEdit"
    :Visible="catEdit"
    @closeCatEdit="closeCatEdit"
    :catData="this.row"
  ></worker-edit>
</template>

<script>
import workerEdit from "./workerEditDialog.vue";
export default {
  props: ["tableData", "titles"],
  components: {
    workerEdit,
  },
  data() {
    return {
      Data: this.$props.tableData,
      proptitles: [
        "employID",
        "employName",
        "workTime",
        "workCategoryName",
        "absenteeism",
      ],
      itemNames: [],
      catEdit: false,
      row: {},
    };
  },
  created() {
    if (this.$props.titles) {
      this.itemNames = this.$props.titles;
    } else {
      if (this.Data[0]) {
        for (let i in this.Data[0]) {
          this.itemNames.push(i);
        }
      } else {
        this.itemNames = this.$store.state.Items;
      }
    }
  },
  methods: {
    openEdit(row) {
      this.catEdit = true;
      this.row = row;
    },
    closeCatEdit() {
      this.catEdit = false;
    },
  },
};
</script>

<style></style>
