<template>
  <el-dialog title="新增地址" v-model="dialogFormVisible" @close="close">
    <el-form :model="form">
      <el-form-item label="客人姓名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="到店时间" :label-width="formLabelWidth">
        <el-input v-model="time" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="1">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: true,
      form: {
        name: "",
        time: "",
      },
    };
  },
  computed: {
    time() {
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      _this.gettime = yy + "/" + mm + "/" + dd + " " + hh + ":" + mf + ":" + ss;
      return _this.gettime;
    },
  },
  methods: {
    submit() {
      this.form.time = this.time;
      this.$emit("closeNew", this.form);
    },
    close() {
      this.$emit("closeNew", this.form);
    },
  },
};
</script>

<style></style>
