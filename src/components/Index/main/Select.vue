<template>
  <div class="main-select">
    <el-card shadow="never">
      <el-form :inline="true" :model="select">
        <el-form-item label="教师名称">
          <el-input v-model="select.teacher" placeholder="教师名称"></el-input>
        </el-form-item>
        <el-form-item label="课程名称">
           <el-input v-model="select.course" placeholder="课程名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <Table :tableData="tableData" :tableHeader="tableHeader" :total="total" :customSort="customSort" :colWidth="colWidth">
      <el-table-column width="200" fixed="right" label="操作">
        <template slot-scope="scope">
          <el-link :underline="false" type="primary"><i  class="el-icon-collection"></i>选课</el-link>
        </template>
      </el-table-column>
    </Table>
  </div>
</template>

<script>
import { SELECT_HEADER } from "./config";
import Select from "@/api/select";
const _select = new Select();

export default {
  data() {
    return {
      select: {
        teacher: "",
        course: ""
      },
      tableData: [],
      tableHeader: SELECT_HEADER,
      total: 0,
      customSort: ['xueshixuefen'],
      colWidth: {
        'kechengmingcheng':'250px',
        'xueshixuefen': '110px'
      }
    };
  },
  mounted() {
    this.getSelect();
  },
  methods: {
    onSubmit() {
      this.getSelect()
    },
    async getSelect() {
      try {
        let res = await _select.getSelect();
        if (res.status == 200 && res.data.code && res.data.code == 200) {
          this.tableData = res.data.data.list;
          this.total = parseInt(res.data.total);
        } else {
          this.$message.info({ showClose: true, message: "查询失败" });
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
  components: {
    Table: () => import("@/components/Table")
  }
};
</script>
