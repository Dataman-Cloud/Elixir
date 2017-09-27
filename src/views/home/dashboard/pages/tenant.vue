<template>
  <div>
    <el-row>
      <el-col :span="10">
          <div style="padding: 14px;">
            <div class="card-title">主机</div>
            <div>
              <pie-chart id="host" height='290px' width='100%' :legend="legend" :serieDatas="serieDatas"></pie-chart>
            </div>
          </div>
      </el-col>
      <el-col :span="10" :offset="2">
          <div style="padding: 14px;">
            <div class="card-title">集群</div>
            <div style="width:100%;height:290px;">
              <h2 class="card-num">{{clusterNumber}}</h2>
            </div>
          </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import PieChart from '@/components/charts/Pie'
import * as type from '@/store/host/mutations_types'

export default {
  components: {
    PieChart
  },
  data () {
    return {
      currentDate: new Date(),
      legend: ['有集群', '无集群'],
      serieDatas: [
        { value: 335, name: '有集群' },
        { value: 310, name: '无集群' }
      ],
      clusterNumber: 0
    }
  },
  computed: {
    ...mapState({
      hostList (state) {
        return state.host.hosts.hosts
      }
    })
  },
  methods: {
    ...mapActions({
      listHosts: type.FETCH_HOSTS
    }),
    async init () {
      await this.listHosts()
      let clusterArr = []
      let hasCluster = 0
      this.hostList.forEach(function (item, index) {
        if (item.clusterLabel && clusterArr.indexOf(item.clusterLabel) === -1) {
          clusterArr.push(item.clusterLabel)
        }
        hasCluster += item.clusterLabel ? 1 : 0
      })
      this.clusterNumber = clusterArr.length
      this.serieDatas = [
        { value: hasCluster, name: '有集群' },
        { value: this.hostList.length - hasCluster, name: '无集群' }
      ]
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style scoped>
.dashboard-title{
  font-size: 20px;
  height: 50px;
  line-height: 24px;
}
.card-title{
  font-size: 18px;
  text-align: center;
}
.card-num{
  line-height: 290px;
  text-align: center;
  font-size: 100px;
}
</style>
