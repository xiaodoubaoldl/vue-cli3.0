<template>
  <div class="home">
    <div>
      <color-picker v-model="color" @change="onChange"></color-picker>
    </div>
    <div>
      <el-button type="primary" @click="getData">githubApi</el-button>
      <el-button type="primary" @click="utils">utils</el-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { VueColorpicker } from '@firehole/vue-pop-colorpicker'

export default {
  name: 'Home',
  components: {
    'color-picker': VueColorpicker
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
