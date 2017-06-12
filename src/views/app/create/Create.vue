<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="应用名称">
      <el-input v-model="form.id"></el-input>
    </el-form-item>
    <el-form-item label="集群">
      <el-select v-model="selectCluster" placeholder="请选择集群" @visible-change="openClusters">
        <el-option v-for="cluster in clusters" :key="cluster.id" :label="cluster.clusterLabel"
                   :value="cluster.clusterLabel"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="镜像地址">
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
          <el-input v-model.number="form.cpus">
            <template slot="prepend">CPU</template>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model.number="form.mem">
            <template slot="prepend">内 存</template>
          </el-input>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="容器个数">
      <el-input v-model.number="form.instances"></el-input>
      <el-checkbox v-model="single">1容器：1主机（如果勾选那么容器的数目将与集群中主机数目保持一致）</el-checkbox>
    </el-form-item>
    <el-form-item label="挂载路径">
      <el-button type="primary" @click="addConfig('volumes')">添加挂在路径</el-button>
    </el-form-item>

    <el-form-item v-for="(volume, index) in form.container.volumes"
                  :key="index">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input v-model="volume.containerPath">
            <template slot="prepend">containerPath</template>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model="volume.hostPath">
            <template slot="prepend">hostPath</template>
          </el-input>
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
          <el-button type="primary" @click="addConfig('healthChecks')">添加健康检查</el-button>
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
              <el-input v-model="healthCheck.path">
                <template slot="prepend">路径</template>
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-input v-model="healthCheck.gracePeriodSeconds">
                <template slot="prepend">宽限时间(秒)</template>
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-input v-model="healthCheck.intervalSeconds">
                <template slot="prepend">检查间隔(秒)</template>
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-input v-model="healthCheck.timeoutSeconds">
                <template slot="prepend">检查超时(秒)</template>
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-input v-model="healthCheck.maxConsecutiveFailures">
                <template slot="prepend">最多失败次数</template>
              </el-input>
            </el-col>
            <el-col :span="3">
              <el-select v-model="healthCheck.ifPortIndex">
                <el-option v-if="form.container.docker.network === 'BRIDGE'" label="端口组索引" :value="0">端口组索引</el-option>
                <el-option v-if="form.container.docker.network === 'HOST'" label="端口号" :value="1">端口号</el-option>
              </el-select>
            </el-col>
            <el-col :span="3" v-if="healthCheck.ifPortIndex === 0">
              <el-input v-model="healthCheck.portIndex">
                <template slot="prepend">端口组索引</template>
              </el-input>
            </el-col>
            <el-col :span="3" v-if="healthCheck.ifPortIndex === 1">
              <el-input v-model="healthCheck.port">
                <template slot="prepend">端口号</template>
              </el-input>
            </el-col>
            <el-button @click.prevent="removeConfig(index, 'healthChecks')"><i class="el-icon-delete"></i></el-button>
          </el-row>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
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
        selectCluster: '',
        clusters: [],
        single: '',
        form: this._.merge({}, appUtil.APP_BASE)
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
      onSubmit () {
        console.log(this.form)
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
            this.form = data.data
            this.form.envs = appUtil.transformEnvtoArray(this.form.env)
            this.selectCluster = this.form.constraints.filter(item => item[0] === 'vcluster')[0][2]
            this.single = this.form.constraints.some(item => item[0] === 'hostname')
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
              vm.form = results[0].data
              vm.form.envs = appUtil.transformEnvtoArray(vm.form.env)
              vm.selectCluster = vm.form.constraints.filter(item => item[0] === 'vcluster')[0][2]
              vm.single = vm.form.constraints.some(item => item[0] === 'hostname')
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
    margin-bottom: 10px;
    padding: 0 !important;
    margin-right: 20px;
  }

  .advance {
    margin-bottom: 20px;
  }
</style>
