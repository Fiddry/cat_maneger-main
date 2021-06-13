<template>
  <div class="">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          ><i class="el-icon-lx-copy"></i> 预约信息</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-tabs v-model="message">
        <el-tab-pane :label="`预约信息(${unComfCostom.length})`" name="first">
          <el-table
            :data="unComfCostom"
            :show-header="false"
            style="width: 100%"
          >
            <el-table-column>
              <template #default="scope">
                <span class="message-title">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="time" width="180"></el-table-column>
            <el-table-column width="120">
              <template #default="scope">
                <el-button size="small" @click="handleReady(scope.row)"
                  >确认</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="handle-row">
            <el-button type="primary">全部确认</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabs",
  data() {
    return {
      message: "first",
      showHeader: false,
      unComfCostom: [
        {
          time: "2018-04-19 20:00:00",
          name: "陈先生",
          telephone: "1",
          gender: "1",
          money: "1",
        },
      ],
    };
  },
  methods: {
    handleReady(row) {
      this.$store.state.foreCostom.push(row);
      this.unComfCostom.pop(row);
    },
  },
  computed: {
    unComfCostomNum() {
      return this.unComfCostom.length;
    },
  },
};
</script>

<style>
.message-title {
  cursor: pointer;
}
.handle-row {
  margin-top: 30px;
}
</style>
