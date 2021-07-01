<template>
<div>
  <div id="map">
  </div>
  <!-- react微应用挂载DOM -->
  <div id="container"></div>
  <button @click="handleMicroInfo">emitBtn from vue</button>
</div>
</template>
<script>
import actions from '../micro/action.js'
import startQiankun, { registerApp } from '../micro'
const jsondata = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point', // 点类型
        coordinates: [116.518189, 39.923959] // 点类型的"coordinates"成员必须是一个单独的位置
      },
      properties: {
        mag: 1 // 用于heatmap-weight设置热力程度
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [116.484547, 39.990054]
      },
      properties: {
        mag: 1
      }
    }
  ]
}
export default {
  data () {
    return {
      map: null,
      style: {
        glyphs: 'minemap://fonts/{fontstack}/{range}',
        sprite: 'minemap://sprite/sprite',
        sources: {},
        layers: [],
        version: 8
      },
      tracking: true,
      lockHeading: false,
      lngLatTrackData: null,
      prepareResData: null
    }
  },
  mounted () {
    // 初始化配置
    registerApp()
    startQiankun()
    // // 注册一个观察者函数
    actions.onGlobalStateChange((state, prevState) => {
      console.log('主应用', state, prevState)
      // state: 根据不同的actions处理不同交互逻辑
      if (state.actions === 'setZoom') {
        this.map.setZoom(state.data)
      }
      if (state.actions === 'setBearing') {
        this.map.setBearing(state.data)
      }
    })
    // window.addEventListener('custom', this.customHandler)
    this.initMineMap()
  },
  methods: {
    customHandler (params) {
      // 打印事件对象 在5秒后 出现打印，可以看到我们自定义的参数
      console.log(params)
    },
    initMineMap () {
      /**
       * 全局参数设置
       */
      minemap.domainUrl = 'https://minedata.cn'
      minemap.dataDomainUrl = 'https://minedata.cn'
      minemap.serverDomainUrl = 'https://minedata.cn'
      minemap.spriteUrl = 'https://minedata.cn/minemapapi/v2.1.0/sprite/sprite'
      minemap.serviceUrl = 'https://mineservice.minedata.cn/service/'

      minemap.key = '16be596e00c44c86bb1569cb53424dc9'
      minemap.solution = 12877

      this.map = window.map = new minemap.Map({
        container: 'map',
        style: 'https://mineservice.minedata.cn/service/solu/style/id/12877',
        center: [116.46, 39.92],
        zoom: 10,
        pitch: 0,
        maxZoom: 17,
        minZoom: 3,
        projection: 'MERCATOR'
      })
    },
    handleMicroInfo () {
      const start = new Date().getTime()
      const data = jsondata
      for (let index = 0; index < 250000; index++) {
        const obj = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [116.484547, 39.990054]
          },
          properties: {
            mag: 1
          }
        }
        obj.index = index
        data.features.push(obj)
      }
      const end = new Date().getTime()
      console.log(data, (end - start))
      // actions.setGlobalState({ actions: 'sonSetMap', data: data })
    }
  }
}
</script>
<style lang="scss" scoped>
  #map {
    width: 50vw;
    height: 50vh;
    position: relative;
  }
  .btn {
      border: none;
      background-color: #e7e7e7;
      color: black;
      font-size: 12px;
      border-radius: 8px;
      box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
      z-index: 100;
      width: 100px;
      height: 35px;
      cursor: pointer;
      outline: none;
  }

  #view {
      position: absolute;
      right: 40px;
      top: 40px;
  }

  #track {
      position: absolute;
      right: 40px;
      top: 90px;
  }

  #bearing {
      position: absolute;
      right: 40px;
      top: 140px;
  }

  .info-box {
      position: absolute;
      left: 40px;
      bottom: 60px;
      z-index: 10;
      background-color: rgba(231, 231, 231, 0.7);
  }

  .plane-info {
      width: 250px;
      height: 170px;

      position: absolute;
      left: 40px;
      top: 40px;
      z-index: 10;
      background-color: rgba(231, 231, 231, 0.7);
  }

  .plane-info div {
      margin: 10px 10px 10px 10px;
  }
</style>
