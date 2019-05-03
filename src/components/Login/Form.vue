<template>
  <div class="login-form">
    <el-row type="flex" justify="center" align="middle" style="height:100%;">
      <el-col style="width: 410px; padding: 50px 0; border:1px solid #CCCCCC;">
        <el-row>
          <el-col>
            <span class="login-form-title">学生成绩与评教综合管理系统</span>
          </el-col>
        </el-row>
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
          label-width="100px"
          class="login-el-form"
        >
          <el-form-item prop="account" label="账号">
            <el-input v-model="loginForm.account"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input v-model="loginForm.password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">登陆</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        account: "",
        password: ""
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit(
            "submitForm",
            this.loginForm.account,
            this.loginForm.password
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.login-form {
  height: 100%;

  .login-form-title {
    line-height: 3em;
    font-weight: bold;
    margin-left: 100px;
  }

  .login-el-form {
    max-width: 350px;
  }
}
</style>

<style>
.login-form .el-form-item__label {
  color: #000000;
}
</style>


