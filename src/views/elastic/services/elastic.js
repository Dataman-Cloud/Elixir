/**
 * Created by lixiaoyan on 2017/7/11.
 */
export const ELASTIC_BASE = {
  app_id: '',
  type: '',
  operator: '',
  set_value: null,
  requesturi: '',
  monitor_cycle: null,
  threshold: null,
  step: null,
  max_instance: 1,
  min_instance: 1,
  status: true,
  action: 1,
  interval: null,
  created: '',
  updated: '',
  poolname: '',
  user_name: ''
}

export const ELASTIC_FORM_RULES = {
  app_id: [
    {required: true, message: '请选择应用'}
  ],
  type: [
    {required: true, message: '请选择告警规则的类型'}
  ],
  operator: [
    {required: true, message: '请选择告警规则操作符'}
  ],
  set_value: [
    {required: true, message: '告警规则value值不能为空'},
    { type: 'number', min: 0, message: '告警规则 value 值最小为 0' }
  ],
  requesturi: [
    {required: true, message: '请求的值不能为空'}
  ],
  阈值: [
    {required: true, message: '阈值不能为空'}
  ],
  status: [
    {required: true, message: '请选择是否激活'}
  ],
  min_instance: [
    {required: true, message: '最小实例数不能为空'}
  ],
  max_instance: [
    {required: true, message: '最大实例数不能为空不能为空'}
  ],
  step: [
    {required: true, message: '步长不能为空'}
  ],
  monitor_cycle: [
    {required: true, message: '监控周期不能为空'}
  ],
  action: [
    {required: true, message: '请选择或还是缩'}
  ],
  threshold: [
    {required: true, message: '请选择或还是缩'}
  ]
}
