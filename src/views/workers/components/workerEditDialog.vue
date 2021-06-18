<template>
  <el-dialog :before-close="close" v-model="v">
    <el-form ref="form" :model="Data" label-width="80px">
      <template v-for="(item, index) in itemNames" :key="index">
        <el-form-item :label="item">
          <el-input v-model="Data[item]" @keyup.enter="onSubmit"></el-input>
        </el-form-item>
      </template>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";
export default {
  props: ["workerData", "Visible"],
  created() {
    for (let i in this.Data) {
      this.itemNames.push(i);
    }
  },
  data() {
    return {
      Data: this.$props.workerData,
      v: true,
      itemNames: [],
    };
  },
  methods: {
    close() {
      this.$emit("closeCatEdit");
    },
    onSubmit() {
      axios.put("/api/employ/editWorker", this.Data).then((Response) => {
        if (Response) {
          ElMessage.success("员工属性修改成功！");
        }
        else{
          ElMessage.warning("员工属性修改失败，请联系相关人员！")
        }
      });
      this.close();
    },
  },
};
</script>

<style></style>
