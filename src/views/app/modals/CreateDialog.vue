<template>
  <el-dialog :title="isUpdate ? '更新应用' : '创建应用'" v-model="dialogVisible" size="small" ref="dialog" @close="close">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" v-loading="loading" element-loading-text="数据加载中...">
      <div style="height: 50vh; overflow-y:scroll; overflow-x: hidden;" v-scroll="dialogVisible">
        <el-form-item label="应用名称" prop="name">
          <el-input :disabled="isUpdate" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="集群" prop="selectCluster">
          <el-select @visible-change="clusterList" v-model="form.selectCluster" :disabled="isUpdate" >
            <el-option v-for="(cluster, index) in clusters" :key="index" :value="cluster.clusterLabel" :label="cluster.clusterLabel"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="镜像地址" prop="container.docker.image">
          <div>
            <el-input v-model="form.container.docker.image"></el-input>
            <span>镜像格式: [registry-url]/[namespace]/[image]:[tag]</span>
          </div>
          <el-checkbox v-model="form.container.docker.forcePullImage">强制拉取镜像</el-checkbox>
        </el-form-item>
        <el-form-item label="网络模式" prop="container.docker.network">
          <el-radio-group v-model="form.container.docker.network" @change="networkChange">
            <el-radio label="bridge">网桥模式</el-radio>
            <el-radio label="host">HOST 模式</el-radio>
            <el-radio label="swan">Static Ip</el-radio>
          </el-radio-group>
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
          <el-input type="number" v-model.number="form.instances" :disabled="isUpdate"></el-input>
          <!-- <el-checkbox v-model="form.oneContainer" @change="uniqueHostname">1容器：1主机（如果勾选那么容器的数目将与集群中主机数目保持一致）</el-checkbox> -->
        </el-form-item>
        <el-form-item label="挂载路径">
          <el-button type="primary" size="small" @click="addConfig('volumes')">添加挂载路径</el-button>
        </el-form-item>

        <el-form-item v-for="(volume, index) in form.container.volumes" :key="index" class="wrapContainerRow">
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item :prop="'container.volumes.' + index + '.containerPath'" :key="volume.index" :rules="[{ required: true, message: '容器路径不能为空' }]">
                <el-input v-model="volume.containerPath">
                  <template slot="prepend">容器路径</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item :prop="'container.volumes.' + index + '.hostPath'" :key="volume.index" :rules="[{ required: true, message: '主机路径不能为空' }]">
                <el-input v-model="volume.hostPath">
                  <template slot="prepend">主机路径</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
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

        <el-form-item v-if="form.container.docker.network !=='host' && form.container.docker.network !=='bridge'" label="子网" prop="subnet">
          <el-select v-model="form.subnet" @visible-change="selectSubnet" @change="getIps">
            <el-option v-for="(subnet, index) in subnets" :key="index" :value="subnet" :label="subnet.netname"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="form.container.docker.network !=='host' && form.container.docker.network !=='bridge' && form.subnet" label="IP 池" prop="ips">
          <el-select value-key="id" v-model="form.ips" multiple filterable placeholder="请输入关键词">
            <el-option v-for="(staticIp, index) in staticIps" :key="index" :value="staticIp"></el-option>
          </el-select>
        </el-form-item>

        <el-collapse accordion class="advance" v-model="activeCollapse">
          <el-collapse-item name="advance" title="高级设置">

            <el-form-item label="访问网关" class="proxy-label">
              <el-row :gutter="12">
                <el-col :span="20" class="proxy-spec">
                  <el-form-item prop="proxy.enabled" label="网关开关">
                    <el-switch on-color="#01C4BC" v-model="form.proxy.enabled"></el-switch>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item prop="proxy.alias">
                    <el-input v-model="form.proxy.alias" placeholder="网关别名" :disabled="!form.proxy.enabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item prop="proxy.listen" :rules="[{ type: 'integer', min: 1, max: 65535, message: '端口号不在 1 - 65535 范围内' }]">
                    <el-input v-model.number="form.proxy.listen" placeholder="端口" :disabled="!form.proxy.enabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="20">
                  <el-form-item prop="proxy.sticky" label="会话保持">
                    <el-switch on-color="#01C4BC" v-model="form.proxy.sticky" :disabled="!form.proxy.enabled"></el-switch>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="端口映射">
              <el-row :gutter="5">
                <el-col :span="9">
                  <el-button type="primary" size="small" @click="addConfig('portMappings')">添加应用端口地址</el-button>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item v-for="(portMapping, index) in form.container.docker.portMappings" :key="index" class="wrapContainerRow">
              <el-row :gutter="12">
                <el-col :span="9">
                  <el-form-item :prop="'container.docker.portMappings.' + index + '.containerPort'" :key="portMapping.index" :rules="[{ required: true, message: '容器端口不能为空' },{ type: 'integer', min: 1, max: 65535, message: '端口号不在 0 - 65535 范围内' }]">
                    <el-input v-model.number="portMapping.containerPort">
                      <template slot="prepend">容器端口</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <el-form-item :prop="'container.docker.portMappings.' + index + '.protocol'" :key="portMapping.index">
                    <el-select v-model="portMapping.protocol">
                      <el-option value="tcp">tcp</el-option>
                      <el-option value="udp">udp</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <el-form-item :prop="'container.docker.portMappings.' + index + '.name'" :key="portMapping.index" :rules="[{ required: true, message: '端口名不能为空' },{ pattern: /^[a-zA-Z]+$/, message: '端口名称只能包含字母' }]">
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

            <el-form-item label="健康检查" v-if="form.container.docker.portMappings.length">
              <el-row :gutter="5">
                <el-col :span="9">
                  <el-button type="primary" size="small" @click="addHealthCheck">添加健康检查</el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item class="wrapContainerRow" v-if="form.healthCheck">
              <el-row :gutter="20">
                <el-col :span="10">
                  <el-form-item :prop="'healthCheck.protocol'" :rules="[{ required: true, message: 'protocol is required' }]">
                    <el-select v-model="form.healthCheck.protocol">
                      <el-option value="">空</el-option>
                      <el-option value="TCP">TCP</el-option>
                      <el-option value="HTTP">HTTP</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10" v-if="form.healthCheck.protocol === 'HTTP'">
                  <el-form-item :prop="'healthCheck.path'" :rules="[{ required: form.healthCheck.protocol, message: 'path is required' }]">
                    <el-input v-model="form.healthCheck.path">
                      <template slot="prepend">路径</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item :prop="'healthCheck.gracePeriodSeconds'" :rules="[{ type: 'integer', min: 1, message: '宽限时间为正整数' },{ required: form.healthCheck.protocol, message: 'gracePeriodSeconds is required' }]">
                    <el-input type="number" v-model.number="form.healthCheck.gracePeriodSeconds">
                      <template slot="prepend">宽限时间(秒)</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item :prop="'healthCheck.intervalSeconds'" :rules="[{ type: 'integer', min: 1, message: '检查间隔为正整数' },{ required: form.healthCheck.protocol, message: 'intervalSeconds is required' }]">
                    <el-input type="number" v-model.number="form.healthCheck.intervalSeconds">
                      <template slot="prepend">检查间隔(秒)</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item :prop="'healthCheck.delaySeconds'" :rules="[{ type: 'integer', min: 1, message: '延迟时间为正整数' },{ required: form.healthCheck.protocol, message: 'delaySeconds is required' }]">
                    <el-input type="number" v-model.number="form.healthCheck.delaySeconds">
                      <template slot="prepend">延迟时间(秒)</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item :prop="'healthCheck.timeoutSeconds'" :rules="[{ type: 'integer', min: 1, message: '检查超时时间为正整数' },{ required: form.healthCheck.protocol, message: 'timeoutSeconds is required' }]">
                    <el-input type="number" v-model.number="form.healthCheck.timeoutSeconds">
                      <template slot="prepend">检查超时(秒)</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item :prop="'healthCheck.consecutiveFailures'" :rules="[{ type: 'integer', min: 1, message: '最多失败次数为正整数' },{ required: form.healthCheck.protocol, message: 'consecutiveFailures is required' }]">
                    <el-input type="number" v-model.number="form.healthCheck.consecutiveFailures">
                      <template slot="prepend">最多失败次数</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item :prop="'healthCheck.portName'" :rules="[{ required: form.healthCheck.protocol, message: 'portName is required' },{ pattern: /^[a-zA-Z]+$/, message: '端口名称只能包含字母' }]">
                    <el-input type="text" v-model.number="form.healthCheck.portName">
                      <template slot="prepend">端口名</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-button @click.prevent="removeHealthCheck">
                  <i class="el-icon-delete"></i>
                </el-button>
              </el-row>
            </el-form-item>

            <el-form-item label="环境变量">
              <el-button type="primary" size="small" @click="addConfig('envs')">添加环境变量</el-button>
            </el-form-item>
            <el-form-item v-for="(env, index) in form.envs" :key="index" class="wrapContainerRow">
              <el-row :gutter="12">
                <el-col :span="9">
                  <el-form-item :prop="'envs.' + index + '.key'" :key="env.index" :rules="[{ required: true, message: 'KEY 能为空' },{ pattern: /^[^\u4e00-\u9fa5]*$/, message: 'KEY 不能包含中文' }]">
                    <el-input v-model="env.key">
                      <template slot="prepend">KEY</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <el-form-item :prop="'envs.' + index + '.value'" :key="env.index" :rules="[{ required: true, message: 'VALUE 不能为空' },{ pattern: /^[^\u4e00-\u9fa5]*$/, message: 'VALUE 不能包含中文' }]">
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
            <el-form-item label="命令" prop="cmd">
              <el-input v-model="form.cmd">
                <template slot="prepend">输入需要运行的命令</template>
              </el-input>
            </el-form-item>
            <el-form-item label="Docker 参数">
              <el-button type="primary" size="small" @click="addConfig('parameters')">添加 Docker 参数</el-button>
            </el-form-item>
            <el-form-item v-for="(parameter, index) in form.container.docker.parameters" :key="index" class="parameters">
              <el-row :gutter="12">
                <el-col :span="8">
                  <el-form-item :prop="'container.docker.parameters.' + index + '.key'" :key="parameter.index" :rules="[{ required: true, message: 'KEY 不能为空' },{ pattern: /^[^\u4e00-\u9fa5]*$/, message: 'KEY 不能包含中文' }]">
                    <el-input v-model="parameter.key">
                      <template slot="prepend">KEY</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <el-form-item :prop="'container.docker.parameters.' + index + '.value'" :key="parameter.index" :rules="[{ required: true, message: 'VALUE 不能为空' },{ pattern: /^[^\u4e00-\u9fa5]*$/, message: 'VALUE 不能包含中文' }]">
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
            <el-form-item label="拓扑">
              <el-row :gutter="12">
                <el-col :span="8">
                  <el-form-item prop="labels.PROLONGATIONTYPE" :rules="[{ required: form.labels.PROLONGATION4ROOTAPP, message: '拓扑选项不能为空' }]">
                    <el-select v-model="form.labels.JBORG_PROLONGATIONTYPE" placeholder="请选择">
                      <el-option value="">空</el-option>
                      <el-option value="CACHE">CACHE</el-option>
                      <el-option value="DB">DB</el-option>
                      <el-option value="WEB">WEB</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="labels.PROLONGATION4ROOTAPP" :rules="[{ required: form.labels.PROLONGATIONTYPE, message: '拓扑名称不能为空' }]">
                    <el-input v-model="form.labels.JBORG_PROLONGATION4ROOTAPP"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
      </div>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSubmit('form')" :loading="submitLoading">立即{{isUpdate ? '更新' : '创建'}}
      </el-button>
      <el-button @click="dialogVisible = false">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapActions } from 'vuex'
import * as appUtil from '@/views/app/services/app'
import * as fetchApp from '@/api/app'
import * as type from '@/store/app/mutations_types'
import * as cluster from '@/api/cluster'
import * as tenant from '@/api/tenant'

export default {
  data () {
    return {
      dialogVisible: false,
      form: this._.merge({}, appUtil.APP_BASE, { selectCluster: '' }),
      rules: appUtil.APP_FORM_RULES,
      submitLoading: false,
      loading: false,
      id: null,
      activeCollapse: '',
      clusters: [],
      subnets: [],
      staticIps: []
    }
  },
  computed: {
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
    addHealthCheck () {
      if (!this.form.healthCheck) {
        this.$set(this.form, 'healthCheck', {
          protocol: 'TCP',
          path: '',
          delaySeconds: null,
          gracePeriodSeconds: null,
          intervalSeconds: null,
          portName: null,
          timeoutSeconds: null,
          consecutiveFailures: null
        })
      } else {
        this.$notify({
          title: '提示',
          message: '健康检查只能添加一条'
        })
      }
    },
    close () {
      this.resetForm()
      this.submitLoading = false
    },
    async clusterList (flag) {
      if (flag) {
        let {data} = await cluster.clusterList()
        this.clusters = data
      }
    },
    async getIps (value) {
      if (this.form.selectCluster && this.form.subnet) {
        let { data } = await tenant.getStaticIp(value.cidr, this.form.selectCluster)
        this.staticIps = data
      }
    },
    networkChange (netowrk) {
      if (netowrk === 'host') {
        this.form.container.docker.portMappings = []
      }
    },
    onSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.setClusterConstraints()
          this.form.env = appUtil.transformEnvstoObj(this.form.envs)
          this.submitLoading = true
          if (this.form.container.docker.network !== 'host' && this.form.container.docker.network !== 'bridge') {
            this.form.container.docker.network = this.form.subnet.netname
          }
          try {
            this.isUpdate ? await fetchApp.update(this.id, this.form) : await fetchApp.create(this.form)
            this.dialogVisible = false
            this.fetchApps()
          } catch (error) {
            this.submitLoading = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    open (id) {
      this.id = id
      this.form = this._.merge({}, appUtil.APP_BASE, { selectCluster: '' })
      if (this.isUpdate) {
        this.activeCollapse = 'advance'
        this.updateInitFetch(this.id)
          .then(res => this.updateInit(res))
      } else {
        this.activeCollapse = ''
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
    removeHealthCheck () {
      this.$delete(this.form, 'healthCheck')
    },
    resetForm () {
      this.$refs.form.resetFields()
    },
    setClusterConstraints () {
      let clusterIndex = this.form.constraints.findIndex(item => item.attribute === 'vcluster')
      this.form.constraints[clusterIndex].value = this.form.selectCluster
    },
    async selectSubnet (flag) {
      if (flag) {
        let { data } = await tenant.getSubnets()
        this.subnets = data
      }
    },
    uniqueHostname () {
      // TODO: 一容器一主机
    },
    async updateInitFetch (appId) {
      this.loading = true
      let res = await fetchApp.getApp(appId)
      this.loading = false
      return res
    },
    updateInit (initFetchData) {
      let formTemp = this._.merge({}, appUtil.APP_BASE, initFetchData.data.version, {
        selectCluster: ''
      })
      this.form = this._.pick(formTemp, Object.keys(appUtil.APP_BASE).concat(['id', 'selectCluster']))
      this.form.envs = appUtil.transformEnvtoArray(this.form.env)
      let vClusterConstraint = this.form.constraints.filter(item => item.attribute === 'vcluster')[0]
      this.form.selectCluster = vClusterConstraint ? vClusterConstraint.value : ''
      if (formTemp.container.docker.network !== 'host' && formTemp.container.docker.network !== 'bridge') {
        this.form.subnet = formTemp.container.docker.network
        this.form.container.docker.network = 'swan'
      }
    }
  },
  watch: {
    'form.container.docker.portMappings': function (newValue) {
      if (newValue.length === 0) {
        this.removeHealthCheck()
      }
    },
    'form.proxy.enabled': function (newValue) {
      if (!newValue) {
        this.$set(this.form, 'proxy', {
          enabled: false,
          alias: null,
          listen: null,
          sticky: false
        })
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

.proxy-spec {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.wrapContainerRow .el-row .el-col {
  margin-bottom: 20px;
  padding: 0 !important;
  margin-right: 20px;
}

.advance {
  margin-bottom: 20px;
}
</style>
