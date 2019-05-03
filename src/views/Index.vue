<template>
  <div class="index">
    <el-container>
      <el-header>
          <Header @headerSelect="headerSelect"></Header>
      </el-header>
      <el-main>
        <keep-alive>
          <router-view/>
        </keep-alive>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    headerSelect(key, keyPath) {
      switch (key) {
        case 'center':
          this.$router.push('/center')
          break
        case 'user':
          this.$router.push('/user')
          break
        case 'info':
          this.$router.push('/info')
          break
        case 'score':
          this.$router.push('/score')
          break
        case 'select':
          this.$router.push('/select')
          break
        case 'teach':
          this.$router.push('/teach')
          break
        case 'set':
          this.$router.push('/set')
          break
        default:
          break
      }
    }
  },
  components: {
    Header: () => import('@/components/Index/Header')
  }
};
</script>

<style lang="stylus" scoped>
  .index 
    .el-header, .el-main
      padding 0
      min-width 800px
</style>

