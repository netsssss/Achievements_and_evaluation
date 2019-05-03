<template>
  <div class="main-set">
    <el-card shadow="never" v-if="getRole == 'admin'">
      <el-link type="info">发布通知</el-link>
    </el-card>
    <el-card shadow="never" v-if="getRole == 'admin' || getRole == 'teacher'">
      <el-link type="info">站内消息</el-link>
    </el-card>
    <el-card shadow="never">
      <el-link type="info">修改密码</el-link>
    </el-card>
    <el-card shadow="never">
      <el-link type="danger" @click="logout()">退出登录</el-link>
    </el-card>
  </div>
</template>

<script>
import { mapGetters ,mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters(["getRole"])
  },
  methods: {
    ...mapMutations(["setIsLogin","setRole"]),

    logout() {
      this.$confirm("是否确认退出登录?", "退出登录", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning"
      })
        .then(() => {
          this.setIsLogin(false)
          this.$message.info({ showClose: true, message: "已退出登录" });
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message.info({ showClose: true, message: "取消操作" });
        });
    }
  }
};
</script>
