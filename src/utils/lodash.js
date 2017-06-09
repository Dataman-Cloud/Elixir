/**
 * Created by my9074 on 2017/6/9.
 */
import lodash from 'lodash'

export default {
  install: function (Vue, name = '_') {
    Object.defineProperty(Vue.prototype, name, {value: lodash})
  }
}
