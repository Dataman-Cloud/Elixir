import Mock from 'mockjs'
import testApi from './test'
// Mock 测试
Mock.mock(/\/apps\/.*\/other/, 'get', testApi.getAppOther)
Mock.mock(/\/apps\/others/, 'get', testApi.listOthers)

export default Mock
