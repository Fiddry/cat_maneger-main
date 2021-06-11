<template>
  <div>
    <el-drawer
      title="商品"
      v-model="this.$props.drawer"
      :with-header="false"
      :before-close="handleClose"
      destroy-on-close
    >
      <el-table
        :data="tableData"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
        style="width:100%"
        show-summary="true"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="商品名称">
          <template #default="scope">
            <p>{{ scope.row.goodsname }}</p>
          </template>
        </el-table-column>
        <el-table-column label="金额" prop="totolMoney">
          <template #default="scope">
            {{ compute(scope.row) }}
          </template>
        </el-table-column>
        <el-table-column label="购买数量">
          <template #default="scope">
            <el-input-number
              size="mini"
              :min="0"
              v-model="scope.row.numbers"
            ></el-input-number>
          </template>
        </el-table-column>
      </el-table>
      <el-button @click="confirm()">确认</el-button>

      <el-button @click="reset">重置</el-button>
    </el-drawer>
  </div>
</template>

<script>
export default {
  props: ["drawer"],
  data() {
    return {
      tableData: [
        {
          goodsname: "旺仔小馒头",
          price: 2,
          totolMoney: 0,
          numbers: 0,
        },
      ],
      multipleSelection: [],
    };
  },

  methods: {
    compute(row) {
      row.totolMoney = row.price * row.numbers;
      return row.totolMoney;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          this.$emit("changedrawer");
          done();
        })
        .catch(() => {});
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    confirm() {
      this.$confirm("确认关闭？")
        .then(() => {
          this.$emit("changedrawer");
        })
        .catch(() => {});
    },
    reset() {
      console.log("重置");
    },
  },
};
</script>

<style></style>
