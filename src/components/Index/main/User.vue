<template>
  <div class="main-user">
    <el-card shadow="never">
      <el-form :inline="true" :model="user">
        <el-form-item label="名字">
          <el-input v-model="user.name" placeholder="名字"></el-input>
        </el-form-item>
        <el-form-item label="角色">
           <el-input v-model="user.role" placeholder="角色"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit">查询</el-button>
          <el-button @click="onSubmit">添加</el-button>
          <!-- <el-button icon="el-icon-plus" circle size="mini" style="background: #FFFFFF !important; color: #545c64 !important; border:1px solid #CCCCCC !important;"></el-button> -->
        </el-form-item>
      </el-form>
    </el-card>

    <Table :tableData="tableData" :tableHeader="tableHeader" :total="total">
      <el-table-column width="200" fixed="right" label="操作">
        <template slot-scope="scope">
          <el-link :underline="false" type="primary"><i  class="el-icon-delete"></i>移除</el-link>
          <el-link :underline="false" type="primary" style="margin-left: 1em;"><i  class="el-icon-user"></i>权限</el-link>
        </template>
      </el-table-column>
    </Table>
  </div>
</template>

<script>
import { USER_HEADER } from "./config";
import User from "@/api/user";
const _user = new User();

export default {
  data() {
    return {
      user: {
        name: "",
        role: ""
      },
      tableData: [],
      tableHeader: USER_HEADER,
      total: 0,
      customSort: ['xueshixuefen'],
      colWidth: {
        'kechengmingcheng':'250px',
        'xueshixuefen': '110px'
      }
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    onSubmit() {
      this.getUser()
    },
    async getUser() {
      try {
        let res = await _user.getUser();
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
