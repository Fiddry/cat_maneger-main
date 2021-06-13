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
export default {
  props: ["catData", "Visible"],
  created() {
    for (let i in this.Data) {
      this.itemNames.push(i);
    }
  },
  data() {
    return {
      Data: this.$props.catData,
      v: true,
      itemNames: [],
    };
  },
  methods: {
    close() {
      this.$emit("closeCatEdit");
    },
    onSubmit() {
      console.log(this.Data);
      this.close();
    },
  },
};
</script>

<style></style>
