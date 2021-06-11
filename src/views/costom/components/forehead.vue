<template>
  <el-dialog
    title="预约顾客"
    v-model="this.$props.Visible"
    close-on-click-modal="false"
    close-on-press-escape="false"
    @close="changeVisible"
  >
    <div>
      <el-table :data="tableData">
        <el-table-column label="顾客姓名" property="name"></el-table-column>
        <el-table-column label="电话" property="telephone"></el-table-column>
        <el-table-column label="性别" property="gender"></el-table-column>
        <el-table-column label="预约时间" property="time"></el-table-column>
        <el-table-column label="定金" property="money"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button @click="there(scope.row)">到店</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div></el-dialog
  >
</template>

<script>
export default {
  props: ["Visible" ],

  data() {
    return {
      tableData: [
        {
          name: "1",
          telephone: "1",
          gender: "1",
          time: "1",
          money: "1",
        },
      ],
    };
  },
  methods: {
    changeVisible() {
      this.$emit("changeVisible");
    },
    there(row) {
      console.log(row);
      this.tableData.pop(row);
      this.$emit("comeCostom",row)
    },
  },
};
</script>

<style></style>
