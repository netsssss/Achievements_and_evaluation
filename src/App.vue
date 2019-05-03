<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
html,
body,
#app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.el-button--default {
  background: #fff !important;
  border: 1px solid #dcdfe6 !important;
  color: #606266 !important;
}
.el-button--default:hover {
  color: #545c64 !important;
  border-color: #ccced1 !important;
  background-color: #eeeff0 !important;
}
.el-button--primary {
  background: #545c64 !important;
  border: #545c64 !important;
  color: #ffffff !important;
}
.el-button--primary:hover {
  background: #767d83 !important;
  border-color: #767d83 !important;
  color: #fff !important;
}
.el-button--primary:active {
  background: #4c535a !important;
  border-color: #4c535a !important;
  color: #fff !important;
}
.is-active .el-radio-button__inner {
  color: #fff !important;
  background-color: #545c64 !important;
  border-color: #545c64 !important;
}

.is-active .el-radio-button__inner:hover {
  color: #fff !important;
}

.el-radio-button__inner:hover {
  color: #545c64 !important;
}
</style>
