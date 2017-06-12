<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="应用名称">
      <el-input v-model="form.id"></el-input>
    </el-form-item>
    <el-form-item label="集群">
      <el-select v-model="selectCluster" placeholder="请选择集群" @visible-change="openClusters">
        <el-option v-for="cluster in clusters" :label="cluster.clusterLabel" :value="cluster.clusterLabel"></el-option>
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
    <el-form-item label="容器规格">
      <el-row :gutter="20">
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
</style>
