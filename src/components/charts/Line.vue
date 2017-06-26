<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>
<script>
  // 引入 ECharts 主模块
  const echarts = require('echarts/lib/echarts')

  require('echarts/lib/chart/line')
  require('echarts/lib/chart/bar')
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/toolbox')
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
      title: {
        type: String,
        default: '请求数'
      },
      yAxisName: {
        type: String,
        default: '单位（%）'
      },
      legend: {
        type: Array
      },
      xAxisType: {
        type: String,
        default: 'category'
      },
      xAxisData: {
        type: Array,
        default: function () {
          return []
        }
      },
      serieDatas: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data () {
      return {
        chart: null
      }
    },
    watch: {
      legend (legendList) {
        this.initChart()
      },
      serieDatas (dataList) {
        this.initChart()
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
          title: {
            text: this.title
          },
          tooltip: {
            trigger: 'axis'
          },
          toolbox: {
            show: true,
            left: '18%',
            feature: {
              dataView: {readOnly: true},
              saveAsImage: {}
            }
          },
          legend: {
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            right: '4%',
            textStyle: {
              fontSize: 12
            },
            data: this.legend
          },
          xAxis: [{
            type: this.xAxisType,
            boundaryGap: true,
            splitLine: {
              show: false
            },
            data: this.xAxisData
          }],
          yAxis: [{
            type: 'value',
            name: this.yAxisName,
            splitLine: {
              show: false
            }
          }],
          series: this.serieDatas
        })
      }
    }
  }
</script>
