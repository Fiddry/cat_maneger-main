<template>
  <div>
    <el-card>
      <el-input
        placeholder="请输入猫咪信息"
        v-model="search"
        class="input-with-select"
      >
        <template #append>
          <el-button @click="tip" icon="el-icon-search"></el-button>
        </template>
      </el-input>

      <cat-table :tableData="catData"></cat-table>
    </el-card>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import catTable from "./components/catTable.vue";
import axios from "axios";
export default {
  created() {
    axios
      .get("/api/cat/catspage", {
        params: {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        },
      })
      .then((response) => {
        this.$store.state.cat = response.data.data;
      });
  },
  updated() {
    axios
      .get("/api/cat/catspage", {
        params: {
          pageSize: this.pageSize,
          currentPage: this.currentPage,
        },
      })
      .then((response) => {
        this.$store.state.cat = response.data.data;
      });
  },
  components: {
    catTable,
  },
  data() {
    return {
      pageSize: 5,
      currentPage: 1,
      total: 12,
      search: "",
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    tip() {
      axios.post("/api/cat/selectCat" + this.search).then((resp) => {
        console.log("resp :>> ", resp);
        this.$store.state.cat = [];
        this.$store.state.cat.push(resp.data);
      });
    },
  },
  watch: {
    pageSize() {
      axios
        .get("/api/cat/catspage", {
          params: {
            pageSize: this.pageSize,
            currentPage: this.currentPage,
          },
        })
        .then((response) => {
          this.$store.state.cat = response.data.data;
        });
    },
  },
  computed: {
    catData() {
      return this.$store.state.cat;
    },
  },
};
</script>

<style></style>
