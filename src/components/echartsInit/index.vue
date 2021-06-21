<template>
  <div style="width:100%;height:100%" class="init-chart"></div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  data () {
    return {
      echarts: null
    }
  },
  methods: {
    ready () {
      return new Promise((resolve, reject) => {
        this.echarts = echarts.init(this.$el)
        resolve(this.echarts)
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
