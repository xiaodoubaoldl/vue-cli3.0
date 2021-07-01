<template>
  <div>
    <h1>{{ count }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
