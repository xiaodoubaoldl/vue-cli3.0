<template>
  <div id="app">
    <div id="nav" v-if="$route.name != 'Earth'">
      <router-link to="/">Home</router-link> |
      <router-link to="/Earth/">灰机啊~</router-link> |
      <router-link to="/app-react">react</router-link> |
      <router-link to="/Map/">map</router-link>
      <!-- <el-button></el-button> -->
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  created () {
  },
  mounted () {
    this.bindWindowResize()
    this.updateBodyFontSize()
  },
  beforeDestroy () {
    this.unbindWindowResize()
  },
  methods: {
    bindWindowResize () {
      this.unbindWindowResize()
      window.addEventListener('resize', this._resizeHandler = () => {
        this.updateBodyFontSize()
      })
    },
    unbindWindowResize () {
      this._resizeHandler && window.removeEventListener('resize', this._resizeHandler)
      delete this._resizeHandler
    },

    updateBodyFontSize () {
      document.documentElement.style.fontSize = this.getFontSize(20) + 'px'
    },
    getFontSize (fontSize) {
      return (fontSize / 1920) * document.body.clientWidth
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
