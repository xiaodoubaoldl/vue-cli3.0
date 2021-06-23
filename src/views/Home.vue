<template>
  <div class="home">
    <div>
      <color-picker v-model="color" @change="onChange"></color-picker>
    </div>
    <div>
      <el-button type="primary" @click="getData">githubApi</el-button>
      <el-button type="primary" @click="utils">utils</el-button>
    </div>
    <div style="width:50rem;height:50rem">
      <v-charts ref="chart"></v-charts>
    </div>
    <!-- <el-button @click="initLineChart">折线图</el-button> -->
  </div>
</template>

<script>
// @ is an alias to /src
import { VueColorpicker } from '@firehole/vue-pop-colorpicker'
import vCharts from '../components/echartsInit'

export default {
  name: 'Home',
  components: {
    'color-picker': VueColorpicker,
    vCharts
  },
  data () {
    return {
      color: 'green',
      chart: null,
      option: {
        title: {
          text: '二狗烧饼店'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['6/18', '6/19', '6/20', '6/21', '6/22']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [18, 28, 31, 45, 32],
          type: 'line'
        }]
      }
    }
  },
  mounted () {
    this.$refs.chart.ready().then((res) => {
      this.chart = res
      this.initLineChart()
    })
  },
  methods: {
    initLineChart () {
      console.log(this.$refs.chart)
      this.chart.setOption(this.option)
      // 添加windowResize事件
      this.addWindowResize(this.chart)
    },
    addWindowResize (echarts, height = 0) {
      this.resizeHandler && window.removeEventListener('resize', this.resizeHandler)
      window.addEventListener('resize', this.resizeHandler = () => {
        this.resizeContainer(echarts, height)
      })
    },
    resizeContainer (echarts, height = 0) {
      const container = this.$refs.chart.$el
      const parentContainer = container.parentElement
      container.style.width = parentContainer.clientWidth + 'px'
      container.style.height = parentContainer.clientHeight - height + 'px'
      // echarts && echarts.resize();
      this.updateCharts()
    },
    updateCharts () {
      if (this.chart) {
        this.chart.setOption(this.option)
        this.chart.resize()
      } else {
        this.initLineChart()
      }
    },
    onChange (color) {
      console.log(color)
    },
    getData () {
      this.$http.get('/api/repos/octokit/octokit.rb').then((res) => {
        console.log(res)
      }).catch((error) => {
        console.log(error)
      })
    },
    utils () {
      console.log(this.$utils.validate('1'))
    }
  }
}
</script>
