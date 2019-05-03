<template>
  <div class="login">
    <el-container class="login-container">
      <el-header class="login-header">
        <Header></Header>
      </el-header>
      <el-main class="login-main">
        <Form @submitForm="submitForm"></Form>
      </el-main>
      <el-footer class="login-footer">
        <Footer></Footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Login from "@/api/login";
const _login = new Login();

export default {
  methods: {
    ...mapMutations(["setIsLogin","setRole"]),

    async submitForm(account, password) {
      try {
        let res = await _login.login(account, password)
        if(res.status == 200 && res.data.code && res.data.code == 200) {
          this.setIsLogin(true)
          res.data.data.role && this.setRole(res.data.data.role)
          this.$message.success({showClose:true,message:'登陆成功'})
          this.$router.push('/')
        } else {
          this.$message.error({showClose:true,message:'用户名或密码错误'})
        }
      } catch(e) {
        console.log(e)
      }
    }
  },
  components: {
    Header: () => import('@/components/Login/Header'),
    Form: () => import('@/components/Login/Form'),
    Footer: () => import('@/components/Login/Footer')
  }
};
</script>

<style lang="stylus" scoped>
  .login
    height 100%
    .login-container
      height 100%
    .login-header
      background-color #545c64;
      border-bottom 2px solid rgb(255, 208, 75)
    .login-main
      // background-color #F0F0F0
      height 100%
    .login-footer
      background-color #545c64;
      border-top 2px solid rgb(255, 208, 75)
</style>

