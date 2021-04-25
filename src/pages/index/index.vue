<template>
  <div id="app">
    <div id="nav">
      <p>多页面</p>
      <a @click="goFn('')">Index</a> |
      <a @click="goFn('page1')">Page1</a>
    </div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  methods: {
    goFn (name) {
      // location.href = `${process.env.BASE_URL}` + name

      this.openRouter({
        name: name
      })
    },
    openRouter ({ query = {}, name = '', type = '' } = {}) {
      let params = ''

      const formatQuery = (query) => {
        let params = ''

        if (query) {
          for (const item in query) {
            const vals = query[item]

            if (vals !== undefined) {
              params += item + '=' + vals + '&'
            }
          }
        }

        params = params ? '?' + params : params

        return params
      }

      if (query) {
        params = formatQuery(query)
      }

      // const homepath = `/${location.pathname.split('/')[1]}/` // 获取单页前缀
      // console.log(homepath)

      const url = `/${name}${params}` // 拼接url

      if (type === 'replace') {
        location.replace(url) // replace 跳转
      } else {
        location.href = url // href 跳转
      }
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
