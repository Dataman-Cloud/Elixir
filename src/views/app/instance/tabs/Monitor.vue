<template>
  <div class="chart-container" style="height: 100vh;">
    <line-chart id="cpu" height='50%' width='50%' title="CPU 使用率" :xAxisData="times"
                :serieDatas="cpuSeries"></line-chart>
    <line-chart id="mem" height='50%' width='50%' title="内存使用率" :xAxisData="times" :serieDatas="memSeries"></line-chart>
    <line-chart id="net" height='50%' width='50%' title="网络收发速率" :legend="netLegend" yAxisName="B/s"
                :xAxisData="times"
                :serieDatas="networkSeries"></line-chart>
    <line-chart id="disk" height='50%' width='50%' title="磁盘读写速率" :legend="diskLegend" yAxisName="B/s"
                :xAxisData="times"
                :serieDatas="diskSeries"></line-chart>
  </div>
</template>
<script>
  import LineChart from '@/components/charts/Line'
  import {initSerie} from '@/utils/chart'
  import baseUrl from 'baseUrl'

  const monitorKeys = ['times', 'cpuData', 'memData', 'netReadData', 'netWriteData', 'diskReadData', 'diskWriteData']

  export default {
    components: {LineChart},
    data () {
      return {
        interval: null,
        netLegend: ['网络读取', '网络发送'],
        diskLegend: ['磁盘读取', '磁盘发送'],
        // 初始化监控 Data
        cpuData: Array.from({length: 12}, (v, k) => 0),
        memData: Array.from({length: 12}, (v, k) => 0),
        netReadData: Array.from({length: 12}, (v, k) => 0),
        netWriteData: Array.from({length: 12}, (v, k) => 0),
        diskReadData: Array.from({length: 12}, (v, k) => 0),
        diskWriteData: Array.from({length: 12}, (v, k) => 0),
        times: Array.from({length: 12}, (v, k) => ''),
        sseInstance: null
      }
    },
    computed: {
      // 初始化监控 Series
      cpuSeries: function () {
        return [initSerie('CPU', 'line', this.cpuData)]
      },
      memSeries: function () {
        return [initSerie('Mem', 'line', this.memData)]
      },
      networkSeries: function () {
        return [initSerie('网络读取', 'line', this.netReadData), initSerie('网络发送', 'line', this.netWriteData)]
      },
      diskSeries: function () {
        return [initSerie('磁盘读取', 'line', this.diskReadData), initSerie('磁盘发送', 'line', this.diskWriteData)]
      }
    },
    methods: {
      getCpuUsageRate (data) {
        let cpuPercent = 0
        let cpuDelta = data.cpu_stats.cpu_usage.total_usage - data.precpu_stats.cpu_usage.total_usage
        let systemDelta = data.cpu_stats.system_cpu_usage - data.precpu_stats.system_cpu_usage

        if (systemDelta > 0 && cpuDelta > 0) {
          cpuPercent = (cpuDelta / systemDelta) * data.cpu_stats.cpu_usage.percpu_usage.length * 100
        }
        return cpuPercent.toFixed(2)
      },
      getNowTime (time) {
        let nowTime = new Date(time)
        let s = nowTime.getSeconds()
        let m = nowTime.getMinutes()
        let h = nowTime.getHours()
        return `${h}:${m}:${s}`
      },
      pickMonitorData (monitorKey, pointData) {
        switch (monitorKey) {
          case 'times':
            return this.getNowTime(pointData.read)
          case 'cpuData':
            return this.getCpuUsageRate(pointData)
          case 'memData':
            return (pointData.memory_stats.usage / pointData.memory_stats.limit * 100).toFixed(2)
          case 'netReadData':
            return pointData.ReceiveRate
          case 'netWriteData':
            return pointData.SendRate
          case 'diskReadData':
            return pointData.BlkIOReadRate
          case 'diskWriteData':
            return pointData.BlkIOWriteRate
          default:
        }
      },
      pushMonitorData (data) {
        let pointData = JSON.parse(data.data)
        monitorKeys.forEach(key => {
          this[key].shift()
          this[key].push(this.pickMonitorData(key, pointData))
        })
      },
      iniMonitorSSE () {
        let monitorSseUrl = `${baseUrl}/v1/node/stats?ip=${this.$route.params.host}&slaveid=${this.$route.params.slaveId}&taskid=${this.$route.params.id}`
        this.sseInstance = new EventSource(monitorSseUrl)
        this.sseInstance.onmessage = e => this.pushMonitorData(e)
        this.sseInstance.error = e => this.sseInstance.close()
      }
    },
    mounted () {
      this.iniMonitorSSE()
    },
    beforeDestroy: function () {
      if (this.sseInstance) {
        this.sseInstance.close()
        this.sseInstance = null
      }
    }
  }
</script>
<style scoped>
  .chart-container {
    display: flex;
    flex-wrap: wrap;
  }
</style>
