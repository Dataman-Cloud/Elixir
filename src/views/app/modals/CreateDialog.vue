<template>
  <el-dialog :title="isUpdate ? '更新应用' : '创建应用'" v-model="dialogVisible" size="small" ref="dialog" @close="close">
    <div style="height: 60vh; overflow-y:scroll; overflow-x: hidden;" v-scroll="dialogVisible">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" v-loading="loading" element-loading-text="数据加载中...">
        <el-form-item label="应用名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="集群">
          <el-input v-model="cluster" disabled></el-input>
        </el-form-item>
        <el-form-item label="镜像地址" prop="container.docker.image">
          <div>
            <el-input v-model="form.container.docker.image"></el-input>
            <span>镜像格式: [registry-url]/[namespace]/[image]:[tag]</span>
          </div>
          <el-checkbox v-model="form.container.docker.forcePullImage">强制拉取镜像</el-checkbox>
        </el-form-item>
        <el-form-item label="网络模式">
          <el-radio-group v-model="form.container.docker.network" @change="networkChange">
            <el-radio label="bridge" :disabled="isUpdate">网桥模式</el-radio>
            <el-radio label="host" :disabled="isUpdate">HOST 模式</el-radio>
            <el-radio label="swan" :disabled="isUpdate">Static IP</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="网络" v-if="form.container.docker.network === 'swan'">
          <el-input v-model="network" disabled></el-input>
        </el-form-item>
        <el-form-item label="容器规格" class="spec">
          <el-row :gutter="12">
            <el-col :span="10">
              <el-form-item prop="cpus">
                <el-input step="0.01" type="number" v-model.number="form.cpus">
                  <template slot="prepend">CPU</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item prop="mem">
                <el-input type="number" v-model.number="form.mem">
                  <template slot="prepend">内 存</template>
                  <template slot="append"> MB</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="容器个数" prop="instances">
          <el-input type="number" v-model.number="form.instances"></el-input>
          <!--<el-checkbox v-model="form.oneContainer" @change="uniqueHostname">1容器：1主机（如果勾选那么容器的数目将与集群中主机数目保持一致）-->
          <!--</el-checkbox>-->
        </el-form-item>
        <el-form-item prop="ipsStr" label="IP" v-if="form.container.docker.network === 'swan'" :disabled="!!form.instances" :rules="[{ required: form.container.docker.network === 'swan', message: 'Static IP 模式下 IP 为必填项,且个数与实例数一致'}, {validator: checkIpsRule}]">
          <el-input type="text" v-model="form.ipsStr" placeholder="请用逗号分隔ip，如192.168.1.1,192.168.1.2"></el-input>
        </el-form-item>
        <el-form-item label="挂载路径">
          <el-button type="primary" size="small" @click="addConfig('volumes')">添加挂在路径</el-button>
        </el-form-item>
        <el-form-item v-for="(volume, index) in form.container.volumes" :key="index">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item :prop="'container.volumes.' + index + '.containerPath'" :key="volume.index" :rules="[{ required: true, message: '容器路径不能为空' }]">
                <el-input v-model="volume.containerPath">
                  <template slot="prepend">容器路径</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :prop="'container.volumes.' + index + '.hostPath'" :key="volume.index" :rules="[{ required: true, message: '主机路径不能为空' }]">
                <el-input v-model="volume.hostPath">
                  <template slot="prepend">主机路径</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item :prop="'container.volumes.' + index + '.mode'" :key="volume.index">
                <el-select v-model="volume.mode">
                  <el-option value="RW">RW</el-option>
                  <el-option value="RD">RD</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-button @click.prevent="removeConfig(index, 'volumes')">
              <i class="el-icon-delete"></i>
            </el-button>
          </el-row>
        </el-form-item>

        <el-collapse accordion class="advance" v-model="activeCollapse">
          <el-collapse-item name="advance" title="高级设置">

            <el-form-item label="端口地址">
              <el-row :gutter="5">
                <el-col :span="9">
                  <el-button type="primary" size="small" @click="addConfig('portMappings')">添加应用端口地址</el-button>
                </el-col>

                <el-col :span="8">
                  Http 代理
                  <el-switch on-text="" off-text="" v-model="form.proxy.enabled" :disabled="!hasPortMapping"></el-switch>
                </el-col>

                <el-col :span="6">
                  <el-input v-model="form.proxy.alias" placeholder="代理别名" :disabled="!hasPortMapping || !form.proxy.enabled"></el-input>
                </el-col>
              </el-row>

            </el-form-item>
            </el-form-item>
            <el-form-item v-for="(portMapping, index) in form.container.docker.portMappings" :key="index" class="healthCheck">
              <el-row :gutter="12">
                <el-col :span="8">
                  <el-form-item :prop="'container.docker.portMappings.' + index + '.containerPort'" :key="portMapping.index" :rules="[{ required: true, message: '容器端口不能为空' }]">
                    <el-input v-model.number="portMapping.containerPort">
                      <template slot="prepend">容器端口</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :prop="'container.docker.portMappings.' + index + '.protocol'" :key="portMapping.index">
                    <el-select v-model="portMapping.protocol">
                      <el-option value="tcp">tcp</el-option>
                      <el-option value="udp">udp</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :prop="'container.docker.portMappings.' + index + '.hostPort'" :key="portMapping.index" :rules="[{ required: true, message: '映射端口不能为空' }]">
                    <el-input v-model.number="portMapping.hostPort">
                      <template slot="prepend">映射端口</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :prop="'container.docker.portMappings.' + index + '.name'" :key="portMapping.index" :rules="[{ required: true, message: '端口名不能为空' }]">
                    <el-input v-model="portMapping.name">
                      <template slot="prepend">端口名</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <el-button @click.prevent="removeConfig(index, 'portMappings')">
                    <i class="el-icon-delete"></i>
                  </el-button>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="健康检查" v-if="form.container.docker.portMappings.length"></el-form-item>
            <el-form-item class="healthCheck" v-if="form.container.docker.portMappings.length">
              <el-row :gutter="20">
                <el-col :span="10">
                  <el-form-item :prop="'healthCheck.protocol'" :rules="[{ required: form.container.docker.portMappings.length, message: 'protocol is required' }]">
                    <el-select v-model="form.healthCheck.protocol">
                      <el-option value="">空</el-option>
                      <el-option value="TCP">TCP</el-option>
                      <el-option value="HTTP">HTTP</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10" v-if="form.healthCheck.protocol === 'HTTP'">
                  <el-form-item :prop="'healthCheck.path'" :rules="[{ required: form.container.docker.portMappings.length, message: 'path is required' }]">
                    <el-input v-model="form.healthCheck.path">
                      <template slot="prepend">路径</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item :prop="'healthCheck.gracePeriodSeconds'" :rules="[{ type: 'integer', min: 1, message: '宽限时间为正整数' },{ required: form.container.docker.portMappings.length, message: 'gracePeriodSeconds is required' }]">
                    <el-input type="number" v-model.number="form.healthCheck.gracePeriodSeconds">
                      <template slot="prepend">宽限时间(秒)</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item :prop="'healthCheck.intervalSeconds'" :rules="[{ type: 'integer', min: 1, message: '检查间隔为正整数' },{ required: form.container.docker.portMappings.length, message: 'intervalSeconds is required' }]">
                    <el-input type="number" v-model.number="form.healthCheck.intervalSeconds">
                      <template slot="prepend">检查间隔(秒)</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item :prop="'healthCheck.delaySeconds'" :rules="[{ type: 'integer', min: 1, message: '延迟时间为正整数' },{ required: form.container.docker.portMappings.length, message: 'delaySeconds is required' }]">
                    <el-input type="number" v-model.number="form.healthCheck.delaySeconds">
                      <template slot="prepend">延迟时间(秒)</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item :prop="'healthCheck.timeoutSeconds'" :rules="[{ type: 'integer', min: 1, message: '检查超时时间为正整数' },{ required: form.container.docker.portMappings.length, message: 'timeoutSeconds is required' }]">
                    <el-input type="number" v-model.number="form.healthCheck.timeoutSeconds">
                      <template slot="prepend">检查超时(秒)</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item :prop="'healthCheck.consecutiveFailures'" :rules="[{ type: 'integer', min: 1, message: '最多失败次数为正整数' },{ required: form.container.docker.portMappings.length, message: 'consecutiveFailures is required' }]">
                    <el-input type="number" v-model.number="form.healthCheck.consecutiveFailures">
                      <template slot="prepend">最多失败次数</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item :prop="'healthCheck.portName'" :rules="[{ required: form.container.docker.portMappings.length, message: 'portName is required' }]">
                    <el-input type="text" v-model.number="form.healthCheck.portName">
                      <template slot="prepend">端口名</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="环境变量">
              <el-button type="primary" size="small" @click="addConfig('envs')">添加环境变量</el-button>
            </el-form-item>
            <el-form-item v-for="(env, index) in form.envs" :key="index" class="healthCheck">
              <el-row :gutter="12">
                <el-col :span="8">
                  <el-form-item :prop="'envs.' + index + '.key'" :key="env.index" :rules="[{ required: true, message: '环境变量的 KEY 个数不能为空' },{ pattern: /^[^\u4e00-\u9fa5]*$/, message: '环境变量的 KEY 不能包含中文' }]">
                    <el-input v-model="env.key">
                      <template slot="prepend">KEY</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :prop="'envs.' + index + '.value'" :key="env.index" :rules="[{ required: true, message: '环境变量的 VALUE 个数不能为空' },{ pattern: /^[^\u4e00-\u9fa5]*$/, message: '环境变量的 VALUE 不能包含中文' }]">
                    <el-input v-model="env.value">
                      <template slot="prepend">VALUE</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-button @click.prevent="removeConfig(index, 'envs')">
                  <i class="el-icon-delete"></i>
                </el-button>
              </el-row>
            </el-form-item>
            <el-form-item label="Docker 参数">
              <el-button type="primary" size="small" @click="addConfig('parameters')">添加 Docker 参数</el-button>
            </el-form-item>
            <el-form-item v-for="(parameter, index) in form.container.docker.parameters" :key="index" class="parameters">
              <el-row :gutter="12">
                <el-col :span="8">
                  <el-form-item :prop="'container.docker.parameters.' + index + '.key'" :key="parameter.index" :rules="[{ required: true, message: 'Docker 参数的 KEY 个数不能为空' },{ pattern: /^[^\u4e00-\u9fa5]*$/, message: 'Docker 参数的 KEY 不能包含中文' }]">
                    <el-input v-model="parameter.key">
                      <template slot="prepend">KEY</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <el-form-item :prop="'container.docker.parameters.' + index + '.value'" :key="parameter.index" :rules="[{ required: true, message: 'Docker 参数的 VALUE 个数不能为空' },{ pattern: /^[^\u4e00-\u9fa5]*$/, message: 'Docker 参数的 KEY 不能包含中文' }]">
                    <el-input v-model="parameter.value">
                      <template slot="prepend">VALUE</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-button @click.prevent="removeConfig(index, 'parameters')">
                  <i class="el-icon-delete"></i>
                </el-button>
              </el-row>
            </el-form-item>
            <el-form-item label="命令" prop="cmd">
              <el-input v-model="form.cmd">
                <template slot="prepend">输入需要运行的命令</template>
              </el-input>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')" :loading="submitLoading">立即{{isUpdate ? '更新' : '创建'}}
          </el-button>
          <el-button type="primary" @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
import { mapActions } from 'vuex'
import * as appUtil from '@/views/app/services/app'
import * as fetchApp from '@/api/app-swan'
import * as type from '@/store/app/mutations_types'

export default {
  data () {
    return {
      dialogVisible: false,
      cluster: 'dataman',
      network: 'swan',
      form: this._.merge({}, appUtil.APP_BASE, { oneContainer: false }),
      rules: appUtil.APP_FORM_RULES,
      submitLoading: false,
      loading: false,
      id: null
    }
  },
  computed: {
    activeCollapse: function () {
      return this.isUpdate ? 'advance' : ''
    },
    hasPortMapping: function () {
      return !!this.form.container.docker.portMappings.length
    },
    isUpdate: function () {
      return !!this.id
    }
  },
  directives: {
    scroll: function (el, bind) {
      if (!bind.value) {
        el.scrollTop = 0
      }
    }
  },
  methods: {
    ...mapActions({
      fetchApps: type.FETCH_APPS
    }),
    addConfig (configName) {
      const config = this._.merge({}, appUtil.DYNAMIC_CONFIG)
      if (this.form.container.docker[configName]) {
        this.form.container.docker[configName].push(config[configName])
      } else if (this.form.container[configName]) {
        this.form.container[configName].push(config[configName])
      } else {
        this.form[configName].push(config[configName])
      }
    },
    checkIpsRule (rule, value, callback) {
      if (this.form.instances === value.split(',').length) {
        callback()
      } else {
        callback(new Error('IP 个数与实例个数不符'))
      }
    },
    close () {
      this.resetForm()
      this.submitLoading = false
    },
    networkChange (netowrk) {
      if (netowrk === 'swan') {
        this.$set(this.form, 'ips', [])
        this.$set(this.form, 'ipsStr', undefined)
      } else {
        this.$delete(this.form, 'ips')
        this.$delete(this.form, 'ipsStr')
      }
    },
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          //            this.setClusterConstraints()
          this.form.env = appUtil.transformEnvstoObj(this.form.envs)
          if (this.form.ips && this.form.ipsStr) {
            this.form.ips = this.form.ipsStr.split(',')
          }
          this.submitLoading = true
          this.isUpdate ? fetchApp.update(this.id, this.form)
            .then(() => {
              this.dialogVisible = false
              this.$store.dispatch(type.FETCH_APPS)
            })
            .catch(() => {
              this.submitLoading = false
            }) : fetchApp.create(this.form)
              .then(() => {
                this.dialogVisible = false
                this.$store.dispatch(type.FETCH_APPS)
              })
              .catch(() => {
                this.submitLoading = false
              })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    open: function (id) {
      this.id = id
      this.form = this._.merge({}, appUtil.APP_BASE, { oneContainer: false })
      if (this.isUpdate) {
        this.updateInitFetch(this.id)
          .then(res => this.updateInit(res))
      }
      this.$refs.dialog.open()
    },
    removeConfig (index, configName) {
      if (this.form.container.docker[configName]) {
        this.form.container.docker[configName].splice(index, 1)
      } else if (this.form.container[configName]) {
        this.form.container[configName].splice(index, 1)
      } else {
        this.form[configName].splice(index, 1)
      }
    },
    resetForm () {
      this.$refs.form.resetFields()
    },
    setClusterConstraints () {
      let clusterIndex = this.form.constraints.findIndex(item => item.attribute === 'vcluster')
      this.form.constraints[clusterIndex].value = this.form.selectCluster
    },
    updateInitFetch (appId) {
      this.loading = true
      return fetchApp.curVersion(appId)
        .then((res) => {
          this.loading = false
          return res
        })
    },
    updateInit (initFetchData) {
      let formTemp = this._.merge({}, appUtil.APP_BASE, initFetchData.data, {
        oneContainer: false
      })
      this.form = this._.pick(formTemp, Object.keys(appUtil.APP_BASE).concat(['id', 'oneContainer', 'healthCheck']))
      this.form.envs = appUtil.transformEnvtoArray(this.form.env)
      //        this.form.selectCluster = this.form.constraints.find(item => item.attribute === 'vcluster') ? this.form.constraints.find(item => item.attribute === 'vcluster').value : ''
      //        this.form.oneContainer = this.form.constraints.some(item => item[0] === 'hostname')
    }
  },
  watch: {
    'form.container.docker.portMappings': function (newValue) {
      if (newValue.length && !this.form.healthCheck) {
        this.$set(this.form, 'healthCheck', {
          protocol: null,
          path: null,
          delaySeconds: null,
          gracePeriodSeconds: null,
          intervalSeconds: null,
          portName: null,
          timeoutSeconds: null,
          consecutiveFailures: null
        })
      }

      if (newValue.length === 0) {
        this.$set(this.form, 'proxy', {
          enabled: false,
          alias: null
        })
        this.$delete(this.form, 'healthCheck')
      }
    }
  }
}
</script>
<style scoped>
.spec .el-row .el-col-6 {
  padding: 0 !important;
  margin-right: 20px;
}

.healthCheck .el-row .el-col {
  margin-bottom: 20px;
  padding: 0 !important;
  margin-right: 20px;
}

.advance {
  margin-bottom: 20px;
}
</style>
