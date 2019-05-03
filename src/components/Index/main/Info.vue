<template>
  <div class="main-info">
    <el-card shadow="never">
      <el-row>
        <el-col :span="20">
          <el-form :inline="true" :model="info">
            <el-form-item :label="type == 'student' ? '学号' : '教工号'">
              <el-input v-model="info.no" :placeholder="type == 'student' ? '学号' : '教工号'"></el-input>
            </el-form-item>
            <el-form-item label="专业" v-if="type == 'student'">
              <el-input v-model="info.major" placeholder="专业"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="onSubmit">查询</el-button>
              <el-button @click="add">添加</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4">
          <el-row type="flex" justify="end" style="margin-right:30px;">
            <el-radio-group v-model="type" @change="handleTypeChange">
              <el-radio-button label="student">学生</el-radio-button>
              <el-radio-button label="teacher">教师</el-radio-button>
            </el-radio-group>
          </el-row>
        </el-col>
      </el-row>
    </el-card>

    <Table :tableData="tableData" :tableHeader="tableHeader" :total="total" :customSort="customSort">
      <el-table-column width="200" fixed="right" label="操作">
        <template slot-scope="scope">
          <el-link :underline="false" type="primary">
            <i class="el-icon-delete"></i>移除
          </el-link>
          <el-link :underline="false" type="primary" style="margin-left: 1em;">
            <i class="el-icon-edit"></i>修改
          </el-link>
        </template>
      </el-table-column>
    </Table>

    <Add :show="addShow" :type="type" @addClose="handleAddClose"></Add>
  </div>
</template>

<script>
import { STUDENT_HEADER, TEACHER_HEADER } from "./config";
import Info from "@/api/info";
const _info = new Info();

export default {
  data() {
    return {
      info: {
        name: "",
        role: ""
      },
      type: 'student',
      tableData: [],
      total: 0,
      customSort: ["no", "className"],
      addShow: false
    };
  },
  mounted() {
    this.getInfo();
  },
  computed: {
    tableHeader() {
      return this.type == 'student' ? STUDENT_HEADER : TEACHER_HEADER
    }
  },
  methods: {
    onSubmit() {
      this.getInfo();
    },
    add() {
      this.addShow = true
    },
    async getInfo() {
      try {
        let res = this.type == 'student' ? await _info.getStudent() : await _info.getTeacher();
        if (res.status == 200 && res.data.code && res.data.code == 200) {
          this.tableData = res.data.data.list;
          this.total = parseInt(res.data.total);
        } else {
          this.$message.info({ showClose: true, message: "查询失败" });
        }
      } catch (e) {
        console.log(e);
      }
    },
    handleTypeChange(type) {
      this.type = type
      this.getInfo()
    },
    handleAddClose() {
      this.addShow = false
    }
  },
  components: {
    Table: () => import("@/components/Table"),
    Add: () => import("@/components/Add")
  }
};
</script>
