<template>
  <div :class="className" :id="id" :style="{height:height,width:width}">
  </div>
</template>
<script>
// 引入 ECharts 主模块
const echarts = require('echarts/lib/echarts')

require('echarts/lib/chart/pie')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/toolbox')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
export default {
  name: 'pie',
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
    legend: {
      type: Array
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
    serieDatas (n, o) {
      if (!this.chart) {
        this.chart = echarts.init(document.getElementById(this.id))
      }
      this.chart.setOption({
        title: {
          text: this.title
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        toolbox: {
          show: true,
          left: '50%'
        },
        legend: {
          x: 'left',
          data: this.legend,
          bottom: 0,
          left: 'center'
        },
        series: [
          {
            name: '主机使用详情',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            roseType: 'radius',
            label: {
              normal: {
                show: false,
                position: 'center',
                formatter: '{b}: {c} ({d}%)'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '12',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: n
          }
        ]
      })
    }
  }
}
</script>
