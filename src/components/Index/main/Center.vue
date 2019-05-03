<template>
  <div class="main-center">
    <el-row style="display:flex; align-items:stretch;">
      <el-col :span="12">
        <el-card shadow="never" class="main-center-info">
          <div slot="header" style="line-height: 1.5em;">
            <span>个人信息</span>
          </div>
          <img src="../../../assets/photo.jpg" style="width:80px;  position:absolute;">
          <el-row v-for="(item, index) in userInfoName" :key="index">
            <el-col :span="7">
              <el-row type="flex" justify="end" style="width: 100%;">
                {{item.label}}:&emsp;
              </el-row>
            </el-col>
            <el-col :span="17">{{userInfo[item.prop]}}</el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12" style="display:flex; align-items:stretch;">
        <el-card shadow="never" style="width:100%;">
          <div slot="header" style="line-height: 1.5em;">
            <span>通知</span>
          </div>
          <el-link :underline="false" type="primary" v-for="(item, index) in notice" :key="index" style="margin-left: 1em; display:block; margin-top: 0.2em;"><i  class="el-icon-bell"></i>&nbsp;{{item}}</el-link>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-card shadow="never" class="main-center-info">
          <div slot="header" style="line-height: 1.5em;">
            <span>消息</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="never">
          <div slot="header" style="line-height: 1.5em;">
            <span>文件</span>
          </div>
          <el-link :underline="false" type="primary" v-for="(item, index) in file" :key="index" style="margin-left: 1em; display:block; margin-top: 0.2em;"><i  class="el-icon-folder"></i>&nbsp;{{item}}</el-link>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { USER_INFO_HEADER } from "./config";
import User from "@/api/user";
const _user = new User();

export default {
  data() {
    return {
      userInfoName: USER_INFO_HEADER,
      userInfo: {},
      notice: [
        '掌上泉院微哨客户端使用手册',
        '关于“掌上泉院”微哨上线试运行的通知',
        '济南大学泉城学院2018年招生章程',
        '济南大学泉城学院2018年专升本招生章程',
        '关于做好山东省2018年普通高等教育专科升本科招生考试报名工作的通知'
      ],
      file: [
        '济南大学泉城学院学生在籍在校证明'
      ]
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      try {
        let res = await _user.getSelf()
        if (res.status == 200 && res.data.code && res.data.code == 200) {
          this.userInfo = res.data.data;
        } else {
          this.$message.info({ showClose: true, message: "查询失败" });
        }
      } catch(e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .main-center
    font-size 14px
    .main-center-info
      line-height 2em
    .el-row, .el-col
      display flex
      align-items stretch
    .el-card
      width 100%
</style>

