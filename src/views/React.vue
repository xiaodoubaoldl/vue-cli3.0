<template>
  <div>
    <h1>reactie</h1>
    <!-- react微应用挂载DOM -->
    <div id="reactie"></div>
  </div>
</template>

<script>
import startQiankun, { registerApp } from '../micro'
export default {
  mounted () {
    // 初始化配置
    registerApp()
    startQiankun()
  }
}
</script>

<style lang="scss" scoped>

</style>
