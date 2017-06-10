/**
 * Created by my9074 on 2017/6/10.
 */
import {MessageBox} from 'element-ui'

export default {
  open: function (msg, confirm = '确定', cancelButtonText = '取消') {
    return MessageBox.confirm(msg, '提示', {
      confirmButtonText: confirm,
      cancelButtonText: cancelButtonText,
      type: 'warning'
    })
  }
}
