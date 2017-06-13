<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="80px">
    <el-form-item label="应用名称" prop="id">
      <el-input v-model="form.id"></el-input>
    </el-form-item>
    <el-form-item label="集群" prop="selectCluster">
      <el-select v-model="form.selectCluster" placeholder="请选择集群" @visible-change="openClusters" @change="clusterChange">
        <el-option v-for="cluster in clusters" :key="cluster.id" :label="cluster.clusterLabel"
                   :value="cluster.clusterLabel"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="镜像地址" prop="container.docker.image">
      <div>
        <el-input v-model="form.container.docker.image"></el-input>
        <span>镜像格式: [registry-url]/[namespace]/[image]:[tag]</span>
      </div>
      <el-checkbox v-model="form.container.docker.forcePullImage">强制拉取镜像</el-checkbox>
    </el-form-item>
    <el-form-item label="网络模式">
      <el-radio-group v-model="form.container.docker.network">
        <el-radio label="BRIDGE">网桥模式</el-radio>
        <el-radio label="HOST">HOST 模式</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="容器规格" class="spec">
      <el-row :gutter="12">
        <el-col :span="6">
          <el-form-item prop="cpus">
            <el-input step="0.01" type="number" v-model.number="form.cpus">
              <template slot="prepend">CPU</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="mem">
            <el-input type="number" v-model.number="form.mem">
              <template slot="prepend">内 存</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="容器个数" prop="instances">
      <el-input type="number" v-model.number="form.instances"></el-input>
      <el-checkbox v-model="form.single" @change="uniqueHostname">1容器：1主机（如果勾选那么容器的数目将与集群中主机数目保持一致）</el-checkbox>
    </el-form-item>
    <el-form-item label="挂载路径">
      <el-button type="primary" size="small" @click="addConfig('volumes')">添加挂在路径</el-button>
    </el-form-item>

    <el-form-item v-for="(volume, index) in form.container.volumes"
                  :key="index">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item
            :prop="'container.volumes.' + index + '.containerPath'"
            :key="volume.index"
            :rules="[
                       { required: true, message: '容器路径不能为空' }
                    ]">
            <el-input v-model="volume.containerPath">
              <template slot="prepend">容器路径</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :prop="'container.volumes.' + index + '.hostPath'"
                        :key="volume.index"
                        :rules="[
                                { required: true, message: '主机路径不能为空' }
                            ]">
            <el-input v-model="volume.hostPath">
              <template slot="prepend">主机路径</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-select v-model="volume.mode">
            <el-option value="RW">RW</el-option>
            <el-option value="RD">RD</el-option>
          </el-select>
        </el-col>
        <el-button @click.prevent="removeConfig(index, 'volumes')"><i class="el-icon-delete"></i></el-button>
      </el-row>
    </el-form-item>

    <el-collapse accordion class="advance">
      <el-collapse-item>
        <template slot="title">
          高级设置
        </template>
        <el-form-item label="健康检查">
          <el-button type="primary" size="small" @click="addConfig('healthChecks')">添加健康检查</el-button>
        </el-form-item>
        <el-form-item v-for="(healthCheck, index) in form.healthChecks"
                      :key="index" class="healthCheck">
          <el-row :gutter="20">
            <el-col :span="2">
              <el-select v-model="healthCheck.protocol">
                <el-option value="TCP">TCP</el-option>
                <el-option value="HTTP">HTTP</el-option>
              </el-select>
            </el-col>
            <el-col :span="3" v-if="healthCheck.protocol === 'HTTP'">
              <el-form-item :prop="'healthChecks.' + index + '.path'"
                            :key="index"
                            :rules="[
                                { required: true, message: '路径不能为空' }
                            ]">
                <el-input v-model="healthCheck.path">
                  <template slot="prepend">路径</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item :prop="'healthChecks.' + index + '.gracePeriodSeconds'"
                            :key="index"
                            :rules="[
                                { required: true, message: '宽限时间不能为空' },
                                { type: 'integer', min: 1, message: '宽限时间为正整数' }
                            ]">
                <el-input type="number" v-model.number="healthCheck.gracePeriodSeconds">
                  <template slot="prepend">宽限时间(秒)</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item :prop="'healthChecks.' + index + '.intervalSeconds'"
                            :key="index"
                            :rules="[
                                { required: true, message: '检查间隔不能为空' },
                                { type: 'integer', min: 1, message: '检查间隔为正整数' }
                            ]">
                <el-input type="number" v-model.number="healthCheck.intervalSeconds">
                  <template slot="prepend">检查间隔(秒)</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item :prop="'healthChecks.' + index + '.timeoutSeconds'"
                            :key="index"
                            :rules="[
                                { required: true, message: '检查超时时间不能为空' },
                                { type: 'integer', min: 1, message: '检查超时时间为正整数' }
                            ]">
                <el-input type="number" v-model.number="healthCheck.timeoutSeconds">
                  <template slot="prepend">检查超时(秒)</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item :prop="'healthChecks.' + index + '.maxConsecutiveFailures'"
                            :key="index"
                            :rules="[
                                { required: true, message: '最多失败次数不能为空' },
                                { type: 'integer', min: 1, message: '最多失败次数为正整数' }
                            ]">
                <el-input type="number" v-model.number="healthCheck.maxConsecutiveFailures">
                  <template slot="prepend">最多失败次数</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item :prop="'healthChecks.' + index + '.ifPortIndex'"
                            :key="index"
                            :rules="[
                                { required: true, message: '请选择端口类型' }
                            ]">
                <el-select v-model="healthCheck.ifPortIndex">
                  <el-option v-if="form.container.docker.network === 'BRIDGE'" label="端口组索引" :value="0">端口组索引</el-option>
                  <el-option v-if="form.container.docker.network === 'HOST'" label="端口号" :value="1">端口号</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3" v-if="healthCheck.ifPortIndex === 0">
              <el-form-item :prop="'healthChecks.' + index + '.portIndex'"
                            :key="index"
                            :rules="[
                                { required: true, message: '端口组索引不能为空' },
                                { type: 'integer', min: 1, message: '端口组索引为正整数' }
                            ]">
                <el-input type="number" v-model.number="healthCheck.portIndex">
                  <template slot="prepend">端口组索引</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3" v-if="healthCheck.ifPortIndex === 1">
              <el-form-item :prop="'healthChecks.' + index + '.port'"
                            :key="index"
                            :rules="[
                                { required: true, message: '端口号不能为空' },
                                { type: 'integer', min: 1, message: '端口号为正整数' }
                            ]">
                <el-input type="number" v-model.number="healthCheck.port">
                  <template slot="prepend">端口号</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <template>
                <el-checkbox v-model="healthCheck.ignoreHttp1xx">忽略HTTP返回码100~199</el-checkbox>
              </template>
            </el-col>
            <el-button @click.prevent="removeConfig(index, 'healthChecks')"><i class="el-icon-delete"></i></el-button>
          </el-row>
        </el-form-item>

        <el-form-item label="端口地址">
          <el-button type="primary" size="small" @click="addConfig('portMappings')">添加应用端口地址</el-button>
        </el-form-item>
        <el-form-item v-for="(portMapping, index) in form.container.docker.portMappings"
                      :key="index" class="healthCheck">
          <el-row :gutter="12">
            <el-col :span="4">
              <el-form-item :prop="'container.docker.portMappings.' + index + '.containerPort'"
                            :key="portMapping.index"
                            :rules="[
                                { required: true, message: '容器端口不能为空' }
                            ]">
                <el-input v-model.number="portMapping.containerPort">
                  <template slot="prepend">容器端口</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-select v-model="portMapping.protocol">
                <el-option value="tcp">tcp</el-option>
                <el-option value="udp">udp</el-option>
              </el-select>
            </el-col>
            <el-button @click.prevent="removeConfig(index, 'portMappings')"><i class="el-icon-delete"></i></el-button>
          </el-row>
        </el-form-item>

        <el-form-item label="环境变量">
          <el-button type="primary" size="small" @click="addConfig('envs')">添加环境变量</el-button>
        </el-form-item>
        <el-form-item v-for="(env, index) in form.envs" class="healthCheck">
          <el-row :gutter="12">
            <el-col :span="6">
              <el-form-item :prop="'envs.' + index + '.key'"
                            :key="env.index"
                            :rules="[
                                { required: true, message: '环境变量的 KEY 个数不能为空' },
                                { pattern: /^[^\u4e00-\u9fa5]*$/, message: '环境变量的 KEY 不能包含中文' }
                            ]">
                <el-input v-model="env.key">
                  <template slot="prepend">KEY</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item :prop="'envs.' + index + '.value'"
                            :key="env.index"
                            :rules="[
                                { required: true, message: '环境变量的 VALUE 个数不能为空' },
                                { pattern: /^[^\u4e00-\u9fa5]*$/, message: '环境变量的 VALUE 不能包含中文' }
                            ]">
                <el-input v-model="env.value">
                  <template slot="prepend">VALUE</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-button @click.prevent="removeConfig(index, 'envs')"><i class="el-icon-delete"></i></el-button>
          </el-row>
        </el-form-item>
        <el-form-item label="命令">
          <el-input v-model="form.cmd">
            <template slot="prepend">输入需要运行的命令</template>
          </el-input>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>

    <el-form-item>
      <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import * as appUtil from '@/utils/app'
  import * as fetchCluster from '@/api/cluster'
  import * as fetchApp from '@/api/app'

  export default {
    beforeRouteEnter (to, from, next) {
      if (to.meta.update) {
        fetchApp.getApp(to.params.id)
          .then(data => {
            next(vm => {
              vm.form = data.data
            })
          })
      } else {
        next()
      }
    },
    data () {
      return {
        clusters: [],
        form: this._.merge({selectCluster: '', single: ''}, appUtil.APP_BASE),
        rules: appUtil.APP_FORM_RULES
      }
    },
    methods: {
      openClusters (flag) {
        if (flag) {
          fetchCluster.listCluster()
            .then(data => {
              this.clusters = data.data
            })
        }
      },
      clusterChange (cluster) {
        let clusterIndex = this.form.constraints.findIndex(item => item[0] === 'vcluster')
        this.form.constraints[clusterIndex][2] = cluster
      },
      uniqueHostname (flag) {
        console.log(flag)
      },
      onSubmit (formName) {
        console.log(this.form)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
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
      removeConfig (index, configName) {
        if (this.form.container.docker[configName]) {
          this.form.container.docker[configName].splice(index, 1)
        } else if (this.form.container[configName]) {
          this.form.container[configName].splice(index, 1)
        } else {
          this.form[configName].splice(index, 1)
        }
      }
    },
    mounted () {
      if (this.$route.meta.update) {
        fetchApp.getApp(this.$route.params.id)
          .then(data => {
            this.form = this._.merge({selectCluster: '', single: ''}, appUtil.APP_BASE, data.data)
            this.form.envs = appUtil.transformEnvtoArray(this.form.env)
            this.form.selectCluster = this.form.constraints.find(item => item[0] === 'vcluster')[2]
            this.form.single = this.form.constraints.some(item => item[0] === 'hostname')
          })

        fetchCluster.listCluster()
          .then(data => this.clusters)
      }
    },
    watch: {
      $route (to, from, next) {
        if (to.meta.update) {
          const getApp = fetchApp.getApp(to.params.id)
          const listCluster = fetchCluster.listCluster()

          Promise.all([getApp, listCluster]).then(results => {
            next(vm => {
              vm.form = vm._.merge({selectCluster: '', single: ''}, appUtil.APP_BASE, results[0].data)
              vm.form.envs = appUtil.transformEnvtoArray(vm.form.env)
              vm.form.selectCluster = vm.form.constraints.filter(item => item[0] === 'vcluster')[0][2]
              vm.form.single = vm.form.constraints.some(item => item[0] === 'hostname')
              vm.clusters = results[1].data
            })
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

  .healthCheck .el-row .el-col {
    margin-bottom: 20px;
    padding: 0 !important;
    margin-right: 20px;
  }

  .advance {
    margin-bottom: 20px;
  }
</style>
