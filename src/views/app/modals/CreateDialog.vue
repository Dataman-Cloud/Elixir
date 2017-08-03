<template>
  <el-dialog :title="isUpdate ? '更新应用' : '创建应用'" v-model="dialogVisible" size="small" ref="dialog" @close="close">
    <div style="height: 60vh; overflow-y:scroll; overflow-x: hidden;" v-scroll="dialogVisible">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" v-loading="loading" element-loading-text="数据加载中...">
        <el-form-item label="应用名称" prop="id">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="集群" prop="selectCluster">
          <el-input v-model="form.selectCluster" disabled></el-input>
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
            <el-radio label="BRIDGE" :disabled="isUpdate">网桥模式</el-radio>
            <el-radio label="HOST" :disabled="isUpdate">HOST 模式</el-radio>
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
          <el-input type="number" v-model.number="form.instances"></el-input>
          <el-checkbox v-model="form.oneContainer" @change="uniqueHostname">1容器：1主机（如果勾选那么容器的数目将与集群中主机数目保持一致）
          </el-checkbox>
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

            <div v-if="form.container.docker.network === 'BRIDGE'">
              <el-form-item label="端口地址">
                <el-button type="primary" size="small" @click="addConfig('portMappings')">添加应用端口地址</el-button>
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
                    <el-form-item :prop="'container.docker.portMappings.' + index + '.servicePort'" :key="portMapping.index" :rules="[{ required: true, message: '映射端口不能为空' }]">
                      <el-input v-model.number="portMapping.servicePort">
                        <template slot="prepend">映射端口</template>
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
            </div>

            <el-form-item label="健康检查">
              <el-button type="primary" size="small" @click="addConfig('healthChecks')">添加健康检查</el-button>
            </el-form-item>
            <el-form-item v-for="(healthCheck, index) in form.healthChecks" :key="index" class="healthCheck">
              <el-row :gutter="20">
                <el-col :span="10">
                  <el-form-item :prop="'healthChecks.' + index + '.protocol'">
                    <el-select v-model="healthCheck.protocol">
                      <el-option value="TCP">TCP</el-option>
                      <el-option value="HTTP">HTTP</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10" v-if="healthCheck.protocol === 'HTTP'">
                  <el-form-item :prop="'healthChecks.' + index + '.path'" :key="index" :rules="[{ required: true, message: '路径不能为空' }]">
                    <el-input v-model="healthCheck.path">
                      <template slot="prepend">路径</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item :prop="'healthChecks.' + index + '.gracePeriodSeconds'" :key="index" :rules="[{ required: true, message: '宽限时间不能为空' },{ type: 'integer', min: 1, message: '宽限时间为正整数' }]">
                    <el-input type="number" v-model.number="healthCheck.gracePeriodSeconds">
                      <template slot="prepend">宽限时间(秒)</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item :prop="'healthChecks.' + index + '.intervalSeconds'" :key="index" :rules="[{ required: true, message: '检查间隔不能为空' },{ type: 'integer', min: 1, message: '检查间隔为正整数' }]">
                    <el-input type="number" v-model.number="healthCheck.intervalSeconds">
                      <template slot="prepend">检查间隔(秒)</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item :prop="'healthChecks.' + index + '.timeoutSeconds'" :key="index" :rules="[{ required: true, message: '检查超时时间不能为空' },{ type: 'integer', min: 1, message: '检查超时时间为正整数' }]">
                    <el-input type="number" v-model.number="healthCheck.timeoutSeconds">
                      <template slot="prepend">检查超时(秒)</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item :prop="'healthChecks.' + index + '.maxConsecutiveFailures'" :key="index" :rules="[{ required: true, message: '最多失败次数不能为空' },{ type: 'integer', min: 1, message: '最多失败次数为正整数' }]">
                    <el-input type="number" v-model.number="healthCheck.maxConsecutiveFailures">
                      <template slot="prepend">最多失败次数</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10" v-if="form.container.docker.network === 'BRIDGE'">
                  <el-form-item :prop="'healthChecks.' + index + '.portIndex'" :key="index" :rules="[{ required: true, message: '端口组索引不能为空' },{ type: 'integer', min: 0, message: '端口组索引为正整数' }]">
                    <el-input type="number" v-model.number="healthCheck.portIndex">
                      <template slot="prepend">端口组索引</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10" v-else>
                  <el-form-item :prop="'healthChecks.' + index + '.port'" :key="index" :rules="[{ required: true, message: '端口号不能为空' },{ type: 'integer', min: 1, message: '端口号为正整数' }]">
                    <el-input type="number" v-model.number="healthCheck.port">
                      <template slot="prepend">端口号</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item :prop="'healthChecks.' + index + '.ignoreHttp1xx'">
                    <template>
                      <el-checkbox v-model="healthCheck.ignoreHttp1xx">忽略HTTP返回码100~199</el-checkbox>
                    </template>
                  </el-form-item>
                </el-col>
                <el-button @click.prevent="removeConfig(index, 'healthChecks')">
                  <i class="el-icon-delete"></i>
                </el-button>
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
            <el-form-item label="拓扑">
              <el-row :gutter="12">
                <el-col :span="8">
                  <el-form-item prop="labels.PROLONGATIONTYPE" :rules="[{ required: form.labels.PROLONGATION4ROOTAPP, message: '拓扑选项不能为空' }]">
                    <el-select v-model="form.labels.PROLONGATIONTYPE" placeholder="请选择">
                      <el-option value="">空</el-option>
                      <el-option value="CACHE">CACHE</el-option>
                      <el-option value="DB">DB</el-option>
                      <el-option value="WEB">WEB</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="labels.PROLONGATION4ROOTAPP" :rules="[{ required: form.labels.PROLONGATIONTYPE, message: '拓扑名称不能为空' }]">
                    <el-input v-model="form.labels.PROLONGATION4ROOTAPP"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
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
import { mapActions, mapState } from 'vuex'
import * as appUtil from '@/views/app/services/app'
import * as fetchApp from '@/api/app'
import * as type from '@/store/app/mutations_types'

export default {
  data () {
    return {
      dialogVisible: false,
      clusters: [],
      form: this._.merge({}, appUtil.APP_BASE, { oneContainer: false, selectCluster: '' }),
      rules: appUtil.APP_FORM_RULES,
      submitLoading: false,
      loading: false,
      id: null
    }
  },
  computed: {
    ...mapState({
      bayname ({ user }) {
        return user.bayname
      }
    }),
    activeCollapse: function () {
      return this.isUpdate ? 'advance' : ''
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
    setClusterConstraints () {
      let clusterIndex = this.form.constraints.findIndex(item => item[0] === 'vcluster')
      this.form.constraints[clusterIndex][2] = this.form.selectCluster
    },
    close () {
      this.resetForm()
      this.submitLoading = false
    },
    networkChange (netowrk) {
      if (netowrk === 'HOST') {
        this.form.container.docker.portMappings = []
      }
    },
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.setClusterConstraints()
          this.form.env = appUtil.transformEnvstoObj(this.form.envs)
          this.form.healthChecks = appUtil.transformHealthChecks(this.form.healthChecks, this.form.container.docker.network)
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
      if (this.isUpdate) {
        this.updateInitFetch(this.id)
          .then(res => this.updateInit(res))
      } else {
        this.form.selectCluster = this.bayname
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
    uniqueHostname () {
      const hostEles = ['hostname', 'UNIQUE']
      if (this.form.oneContainer) {
        if (this.form.constraints.length && !this.form.constraints.some(item => item[0] === 'hostname')) {
          this.form.constraints.push(hostEles)
        }
      } else {
        if (this.form.constraints.some(item => item[0] === 'hostname')) {
          let hostIndex = null
          this.form.constraints.forEach((constraint, index) => {
            constraint.forEach(item => {
              if (item === 'hostname') {
                hostIndex = index
              }
            })
          })

          this.form.constraints.splice(hostIndex, 1)
        }
      }
    },
    updateInitFetch (appId) {
      this.loading = true
      return fetchApp.getApp(appId)
        .then((res) => {
          this.loading = false
          return res
        })
    },
    updateInit (initFetchData) {
      let formTemp = this._.merge({}, appUtil.APP_BASE, initFetchData.data, {
        oneContainer: false,
        selectCluster: ''
      })
      this.form = this._.pick(formTemp, Object.keys(appUtil.APP_BASE).concat(['id', 'oneContainer', 'selectCluster']))
      this.form.envs = appUtil.transformEnvtoArray(this.form.env)
      this.form.selectCluster = this.form.constraints.find(item => item[0] === 'vcluster') ? this.form.constraints.find(item => item[0] === 'vcluster')[2] : ''
      this.form.oneContainer = this.form.constraints.some(item => item[0] === 'hostname')
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
