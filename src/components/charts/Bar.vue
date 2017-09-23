<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>
<script>
  // 引入 ECharts 主模块
  const echarts = require('echarts/lib/echarts')

  require('echarts/lib/chart/bar')
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/toolbox')
  require('echarts/lib/component/title')
  require('echarts/lib/component/legend')
export default {
    name: 'bar',
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      id: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '200px'
      },
      height: {
        type: String,
        default: '200px'
      },
      title: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: '直接访问'
      },
      xAxisData: {
        type: Array
      },
      seriesData: {
        type: Array
      }
    },
    data () {
      return {
        chart: null
      }
    },
    mounted () {
      this.initChart()
    },
    methods: {
      initChart () {
        if (!this.chart) {
          this.chart = echarts.init(document.getElementById(this.id))
        }
        this.chart.setOption({
          color: ['#3398DB'],
          title: {
            text: this.title
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: this.xAxisData || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              barWidth: '60%',
              data: [10, 52, 200, 334, 390, 330, 220]
            }
          ]
        })
      }
    },
    watch: {
      xAxisData (n) {
        if (!this.chart) {
          this.chart = echarts.init(document.getElementById(this.id))
        }
        this.chart.setOption({
          color: ['#3398DB'],
          title: {
            text: this.title
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: n,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: this.name,
              type: 'bar',
              barWidth: '60%',
              data: this.seriesData
            }
          ]
        })
      }
    }
}
</script>
