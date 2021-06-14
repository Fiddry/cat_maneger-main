<template>
  <div>
    <el-table :data="Data" style="width: 100%">
      <!-- <el-table-column type="expand">
        <template #default="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="名字">
              <span>{{ props.row.名字 }}</span>
            </el-form-item>
            <el-form-item label="年龄">
              <span>{{ props.row.年龄 }}</span>
            </el-form-item>
            <el-form-item label="健康状态">
              <span>{{ props.row.健康状态 }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column> -->

      <template v-for="(item, index) in itemNames" :key="index">
        <el-table-column :label="item" :prop="item"></el-table-column>
      </template>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="openEdit(scope.row)">修改猫咪状态</el-button>
        </template>
      </el-table-column>
    </el-table>
    <cat-edit
      v-if="catEdit"
      :Visible="catEdit"
      @closeCatEdit="closeCatEdit"
      :catData="this.row"
    ></cat-edit>
  </div>
</template>

<script>
import catEdit from "./catEditDialog.vue";
export default {
  props: ["tableData", "titles"],
  components: {
    catEdit,
  },
  data() {
    return {
      Data: this.$props.tableData,
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
