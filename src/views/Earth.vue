<template>
  <div id="map">
    <button class="btn" id="view" @click="lockHead">全局视角</button>
    <button class="btn" id="track" @click="trackFly">追踪视角</button>
    <button class="btn" id="bearing" @click="lockBear">锁定航向</button>
    <div class="plane-info">
      <div><span>航班: </span><span id="plane-code"></span></div>
      <div><span>时间: </span><span id="plane-time"></span></div>
      <div><span>坐标: </span><span id="plane-coord"></span></div>
      <div><span>高度: </span><span id="plane-height"></span><span> 米</span></div>
      <div><span>速度: </span><span id="plane-speed"></span><span> 公里/小时</span></div>
    </div>
  </div>
</template>
<script>
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
    this.initMineMap()
  },
  methods: {
    initMineMap () {
      /**
      * 全局参数设置
      */
      minemap.domainUrl = 'https://minedata.cn'
      minemap.dataDomainUrl = 'https://minedata.cn'
      minemap.serverDomainUrl = 'https://minedata.cn'
      minemap.spriteUrl = 'https://minedata.cn/minemapapi/v3.2.0/sprite/sprite'
      minemap.serviceUrl = 'https://mineservice.minedata.cn/service/'
      minemap.key = '16be596e00c44c86bb1569cb53424dc9'
      minemap.solution = 12877
      this.map = new minemap.Map({
        container: 'map',
        style: this.style, /* 底图样式 */
        center: [109.31416613261104, 34.53895654366583],
        zoom: 6.5,
        pitch: 60.5,
        bearing: -27,
        maxZoom: 22, /* 地图最大缩放等级 */
        minZoom: 1, /* 地图最小缩放等级 */
        projection: 'MERCATOR'
      })
      /**
     * 添加基本球体图层，包括球体表面、天空盒、大气层
     *
     */
      this.map.on('load', () => {
        this.map.addSource('sphere-image-globe', {
          url: 'https://minedata.cn/minemapapi/v3.2.0/assets/earth.jpg',
          radius: minemap.R,
          type: 'sphere-image',
          renderInner: false,
          gridSamples: 9,
          debug: false,
          renderAtmosphere: true
        })
        this.map.addSource('sphere-image-skybox', {
          url: 'https://minedata.cn/minemapapi/v3.2.0/assets/sky13m.jpg',
          dayTextureUrl: 'https://minedata.cn/minemapapi/v3.2.0/assets/back.jpg',
          radius: 1,
          type: 'sphere-image',
          renderInner: true,
          gridSamples: 9,
          debug: false
        })

        /* 添加栅格图 */
        this.map.addSource('IMAGERY_SOURCE', {
          type: 'raster', // 数据源类型：栅格数据源
          // "tiles": ["//mt0.google.cn/maps/vt?lyrs=y&hl=zh-CN&gl=CN&&x={x}&y={y}&z={z}&scale=2",
          // "//mt1.google.cn/maps/vt?lyrs=y&hl=zh-CN&gl=CN&&x={x}&y={y}&z={z}&scale=2",
          // "//mt2.google.cn/maps/vt?lyrs=y&hl=zh-CN&gl=CN&&x={x}&y={y}&z={z}&scale=2",
          // "//mt3.google.cn/maps/vt?lyrs=y&hl=zh-CN&gl=CN&&x={x}&y={y}&z={z}&scale=2"], //瓦片服务地址,
          // "tiles": ["http://datahive-ni.minedata.cn:10000/service/map/satellite?z={z}&x={x}&y={y}"], //瓦片服务地址
          tiles: ['https://smap.minedata.cn/service/map/satellite?z={z}&x={x}&y={y}'], // 瓦片服务地址
          tileSize: 256// 瓦片尺寸
        })

        this.map.addLayer({
          id: 'IMAGERY',
          type: 'raster', // 球体栅格类型图层
          source: 'IMAGERY_SOURCE',
          minzoom: 1,
          maxzoom: 23,
          // "depth-test": true,
          paint: {
            'raster-opacity': 1
          }
        })

        /* 添加动态航班 */
        try {
          prepareData((data) => {
            this.prepareResData = data
            // 添加轨迹数据
            var track = new TrackDataUtil({ name: 'airline' })
            track.parseTrack(data.CA1405.positions, 0, 2000, 'plane')
            track.parseTrack(data.CA1406.positions, 2200, 4200, 'plane')

            // 加载飞机模型
            this.map.addSource('scene', {
              type: '3d-model',
              data: 'https://minedata.cn/support/static/api/demo/javascript-3d-api/zh/assets/DynamicFlight/reference/plane1.gltf',
              scale: [10, 10, 10],
              modelFolder: 'https://minedata.cn/support/static/api/demo/javascript-3d-api/zh/assets/DynamicFlight/images/',
              configuration: {
                renderType: 'track',
                speedFactor: 50,
                segmentCount: 4500,
                modelNames: ['plane'],
                trackData: track.getTrackData()
              }
            })

            this.map.addLayer({
              type: '3d-model',
              id: 'scene',
              source: 'scene'
            })
            this.map.repaint = true
            this.map.timer.state = true
            this.map.enableSunLight()

            this.lngLatTrackData = track.getLngLatTrackData()
            requestAnimationFrame(this.moveGPSPoint)
          })
        } catch (e) {
          alert(JSON.stringify(e))
        }
      })
    },
    // 管理视角
    lockHead () {
      this.tracking = false
      this.lockHeading = false
      this.map.easeTo({
        center: [109.31416613261104, 34.53895654366583],
        zoom: 5.637241958649883,
        pitch: 60.5,
        bearing: -27
      })
    },
    // 追踪
    trackFly () {
      this.tracking = true
      this.lockHeading = false
      document.getElementById('bearing').innerHTML = '锁定航向'
      this.map.setZoom(6.5)
    },
    // 锁定航向
    lockBear () {
      if (this.lockHeading) {
        this.lockHeading = false
        document.getElementById('bearing').innerHTML = '锁定航向'
      } else {
        this.lockHeading = true
        document.getElementById('bearing').innerHTML = '取消锁定'
      }
    },
    // 更新飞行信息
    moveGPSPoint () {
      var count = (this.map.timer.counter * 50) % 4500
      if (!this.tracking) {
        requestAnimationFrame(this.moveGPSPoint)
        return
      }

      for (var i = 0; i < this.lngLatTrackData.length; i++) {
        var oneData = this.lngLatTrackData[i]
        var start = oneData.start
        var end = oneData.end

        if (count < start || count > end) continue
        var index = binarySeach(this.lngLatTrackData[i].seqs, count, 0, this.lngLatTrackData[i].seqs.length - 1)

        // 飞机位置控制
        var posNow = this.lngLatTrackData[i].lnglats[index]
        var posNext = this.lngLatTrackData[i].nextLnglats[index]
        var pos = getInterpolationPos((count - this.lngLatTrackData[i].seqs[index]) / (this.lngLatTrackData[i].seqs[index + 1] - this.lngLatTrackData[i].seqs[index]), posNow, posNext)

        var option = {
          center: pos.slice(0, 2)
        }
        if (this.lockHeading) option.bearing = getBearing(posNow, posNext)
        this.map.jumpTo(option)

        if (i === 0) {
          document.getElementById('plane-code').innerHTML = 'CA1405'
          document.getElementById('plane-time').innerHTML = this.prepareResData.CA1405.times[index]
          document.getElementById('plane-coord').innerHTML = `${this.prepareResData.CA1405.positions[index][0]}, ${this.prepareResData.CA1405.positions[index][1]}`
          document.getElementById('plane-height').innerHTML = `${this.prepareResData.CA1405.positions[index][2]}`
          document.getElementById('plane-speed').innerHTML = this.prepareResData.CA1405.speeds[index]
        } else {
          document.getElementById('plane-code').innerHTML = 'CA1406'
          document.getElementById('plane-time').innerHTML = this.prepareResData.CA1406.times[index]
          document.getElementById('plane-coord').innerHTML = `${this.prepareResData.CA1406.positions[index][0]}, ${this.prepareResData.CA1406.positions[index][1]}`
          document.getElementById('plane-height').innerHTML = `${this.prepareResData.CA1406.positions[index][2]}`
          document.getElementById('plane-speed').innerHTML = this.prepareResData.CA1406.speeds[index]
        }
      }

      requestAnimationFrame(this.moveGPSPoint)
    }
  }
}
</script>
<style lang="scss" scoped>
  #map {
    height: 100vh;
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
