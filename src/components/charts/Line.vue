<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>
<script>
  // 引入 ECharts 主模块
  const echarts = require('echarts/lib/echarts')

  require('echarts/lib/chart/line')
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  require('echarts/lib/component/legend')
  export default {
    name: 'linePercent',
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
      legend: {
        type: Array,
        require: true
      },
      listData: {
        type: Array,
        require: true
      }
    },
    data () {
      return {}
    },
    mounted () {
      this.initChart()
    },
    methods: {
      initChart () {
        this.chart = echarts.init(document.getElementById(this.id))

        this.chart.setOption({
          title: {
            text: '请求数'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: this.legend
          },
          xAxis: [{
            boundaryGap: false,
            data: ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55']
          }],
          yAxis: [{
            type: 'value',
            name: '单位（%）'
          }],
          series: [{
            name: '移动',
            type: 'line',
            smooth: true,
            showSymbol: false,
            data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122]
          }, {
            name: '电信',
            type: 'line',
            smooth: true,
            showSymbol: false,
            data: [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150]
          }, {
            name: '联通',
            type: 'line',
            smooth: true,
            showSymbol: false,
            data: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
          }]
        })
      }
    }
  }
</script>
