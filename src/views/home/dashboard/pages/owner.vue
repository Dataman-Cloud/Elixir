<template>
  <div>
    <el-row>
      <el-col :span="7">
        <div style="padding: 14px;">
          <div class="card-title">集群总数：{{clusterNumber}}</div>
          <div>
            <pie-chart id="cluster" height='290px' width='100%' :legend="legend" :serieDatas="serieDatas"></pie-chart>
          </div>
        </div>
      </el-col>
      <el-col :span="7" :offset="1">
        <!-- <el-card :body-style="{ padding: '0px' }"> -->
        <div style="padding: 14px;">
          <div class="card-title">应用</div>
          <div style="width:100%;height:290px;">
            <h2 class="card-num">{{appNumbers}}</h2>
          </div>
        </div>
        <!-- </el-card> -->
      </el-col>
      <el-col :span="7" :offset="1">
        <div style="padding: 14px;">
          <div class="card-title">容器</div>
          <div style="width:100%;height:290px;">
            <h1 class="card-num">{{containerNumber}}</h1>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row style="margin-top:20px;">
      <el-col :span="24">
        <h1 class="dashboard-title">
          应用
        </h1>
        <div>
          <bar-chart id="host" height='290px' width='100%' :xAxisData="clusterName" :seriesData="appDatas" :name="name"></bar-chart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import PieChart from '@/components/charts/Pie'
import BarChart from '@/components/charts/Bar'
import * as clusterType from '@/store/cluster/mutations_types'
import * as appType from '@/store/app/mutations_types'

export default {
  components: {
    PieChart,
    BarChart
  },
  data () {
    return {
      legend: ['使用中', '未使用'],
      name: '应用个数',
      serieDatas: [
        { value: 335, name: '使用中' },
        { value: 310, name: '未使用' }
      ]
    }
  },
  computed: {
    ...mapState({
      appDatas (state) {
        return state.cluster.clusters.clusters.map(item => item.appNum)
      },
      appNumbers (state) {
        return state.app.apps.apps.length
      },
      clusterName (state) {
        return state.cluster.clusters.clusters.map(item => item.clusterLabel)
      },
      clusterNumber (state) {
        let usedCluster = 0
        let cluster = state.cluster.clusters.clusters
        cluster.forEach(function (item, index) {
          usedCluster += item.appNum || item.machineNum ? 1 : 0
        })
        this.serieDatas = [
          { value: usedCluster, name: '使用中' },
          { value: cluster.length - usedCluster, name: '未使用' }
        ]
        return cluster.length
      },
      containerNumber (state) {
        let sum = 0
        state.app.apps.apps.forEach((item, index) => {
          sum += item.task_count
        })
        return sum
      }
    })
  },
  methods: {
    ...mapActions({
      fetchApps: appType.FETCH_APPS,
      fetchClusters: clusterType.FETCH_CLUSTERS
    }),
    async init () {
      await this.fetchApps()
      await this.fetchClusters()
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style scoped>
.dashboard-title {
  font-size: 20px;
  height: 50px;
  line-height: 24px;
}

.card-title {
  font-size: 18px;
  text-align: center;
}

.card-num {
  line-height: 290px;
  text-align: center;
  font-size: 100px;
}
</style>
