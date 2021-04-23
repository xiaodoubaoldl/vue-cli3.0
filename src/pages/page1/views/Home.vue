<template>
  <div class="home">
    <h1>page1</h1>
  </div>
</template>

<script>
// @ is an alias to /src
// import { VueColorpicker } from '@firehole/vue-pop-colorpicker'

export default {
  name: 'Home',
  components: {
    // 'color-picker': VueColorpicker
  },
  data () {
    return {
      color: 'green'
    }
  },
  methods: {
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
