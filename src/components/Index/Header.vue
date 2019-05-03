<template>
  <el-menu
    router
    class="index-el-menu"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :default-active="$route.fullPath.substr(1)"
    @select="handleSelect"
  >
    <el-menu-item index="0">
      <img class="logo" src="../../assets/logo.png" style="height: 100%;">
    </el-menu-item>
    <el-menu-item index="center">个人中心</el-menu-item>
    <el-menu-item index="user" v-if="getRole == 'admin'">用户管理</el-menu-item>
    <el-menu-item index="info" v-if="getRole == 'admin'">信息管理</el-menu-item>
    <el-menu-item index="score" v-if="getRole == 'student' || getRole == 'teacher'">成绩管理</el-menu-item>
    <el-menu-item index="select" v-if="getRole == 'student' || getRole == 'teacher'">选课管理</el-menu-item>
    <el-menu-item index="teach" v-if="getRole == 'student'">评教管理</el-menu-item>
    <el-menu-item index="set">设置</el-menu-item>
    <span
      style="float: right; margin-right:50px; height: 60px; line-height: 60px; color: #FFFFFF; font-size: 14px; outline: none;"
    >{{role}}</span>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getRole"]),

    role() {
      switch (this.getRole) {
        case 'student':
          return '学生'
          break;
        case 'teacher':
          return '教师'
          break;
        case 'admin':
          return '管理员'
          break;
        default:
          return '未知'
          break;
      }
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$emit("headerSelect", key, keyPath);
    }
  }
};
</script>
