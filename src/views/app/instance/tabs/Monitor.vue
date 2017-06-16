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
        times: ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55']
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
    methods: {},
    mounted () {
      let i = 0
      this.interval = setInterval(function () {
        this.netWriteData.shift()
        this.netWriteData.push(100 * Math.random())
        this.netReadData.shift()
        this.netReadData.push(100 * Math.random())

        this.times.shift()
        this.times.push(`14:${i}0`)
        i++
      }.bind(this), 5000)
    },
    beforeDestroy: function () {
      clearInterval(this.interval)
    }
  }
</script>
<style scoped>
  .chart-container {
    display: flex;
    flex-wrap: wrap;
  }
</style>
