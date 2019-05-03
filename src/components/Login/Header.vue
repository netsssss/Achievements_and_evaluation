<template>
  <div class="login-header">
    <el-row style="height: 100%;">
      <el-col :span="12" style="height: 100%;">
        <img class="logo" src="../../assets/logo.png" />
      </el-col>
      <el-col :span="12" style="height: 100%;">
        <el-row type="flex" justify="end" align="middle" style="height: 100%;">
          <span class="login-title-right">毕业设计</span>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="stylus" scoped>
  .login-header
    height 100%
    .logo
      height 100%
    .login-title-right
      font-size 14px
      color rgb(255, 208, 75)
</style>
