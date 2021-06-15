<template>
  <div>
    <el-table :data="this.Data" style="width: 100%">
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
      itemNames: [],
      catEdit: false,
      row: {},
    };
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
  watch: {
    Data(val) {
      console.log(val);
      this.itemNames = [];
      for (let i in this.Data[0]) {
        this.itemNames.push(i);
      }
      return val;
    },
  },
  computed: {
    Data() {
      return this.$props.tableData;
    },
  },
};
</script>

<style></style>
