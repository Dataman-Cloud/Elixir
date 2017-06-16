/**
 * Created by my9074 on 2017/6/15.
 */
const echarts = require('echarts/lib/echarts')

export function initSerie (name, type = 'line', data) {
  return {
    name: name,
    type: type,
    smooth: true,
    showSymbol: false,
    areaStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgba(137, 189, 27, 0.3)'
        }, {
          offset: 0.8,
          color: 'rgba(137, 189, 27, 0)'
        }], false),
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowBlur: 10
      }
    },
    data: data
  }
}
