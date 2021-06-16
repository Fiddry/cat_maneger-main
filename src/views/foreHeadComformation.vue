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
            <el-table-column>
              <template #default="scope">
                <span class="message-title">{{ scope.row.appointmentTime }}</span>
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
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "tabs",
  created() {
    axios.get("/api/consumerAppointment/list").then((resp) => {
      console.log('resp.data :>> ', resp.data);
      this.unComfCostom = resp.data;
    });
  },
  data() {
    return {
      message: "first",
      showHeader: false,
      unComfCostom: [],
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
