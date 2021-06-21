export default {
  beforeDestroy () {
    this.resizeHandler && window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
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
    }
  }
}
