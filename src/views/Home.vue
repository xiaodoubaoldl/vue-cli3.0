<template>
  <div class="home">
    <h1>山炮</h1>
    <div>
      <color-picker v-model="color" @change="onChange"></color-picker>
    </div>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { VueColorpicker } from '@firehole/vue-pop-colorpicker'

export default {
  name: 'Home',
  components: {
    HelloWorld,
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
    }
  }
}
</script>
