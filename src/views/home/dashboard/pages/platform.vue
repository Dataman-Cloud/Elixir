<template>
  <div>
    <el-row>
      <el-col :span="10">
        <div style="padding: 14px;">
          <div class="card-title">主机</div>
          <div v-loading="hostLoading">
            <pie-chart id="host" height='290px' width='100%' :legend="legend" :serieDatas="serieDatas"></pie-chart>
          </div>
        </div>
      </el-col>
      <el-col :span="10" :offset="2">
        <div style="padding: 14px;">
          <div class="card-title">租户</div>
          <div style="width:100%;height:290px;" v-loading="tenantLoading">
            <h2 class="card-num">{{tenantNumber}}</h2>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- <el-row style="margin-top:20px;">
          <el-col :span="24">
            <h1 class="dashboard-title">
              资源使用量
            </h1>
          </el-col>
          <el-col :span="10">
            <el-card :body-style="{ padding: '0px' }">
              <div style="padding: 14px;">
                <div class="card-title">CPU使用量</div>
                <bar-chart id="cpu" width='100%' height='300px'></bar-chart>
              </div>
            </el-card>
          </el-col>
          <el-col :span="10" :offset="2">
            <el-card :body-style="{ padding: '0px' }">
              <div style="padding: 14px;">
                <div class="card-title">内存使用量</div>
                <bar-chart id="mem" width='100%' height='300px'></bar-chart>
              </div>
            </el-card>
          </el-col>
        </el-row> -->
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import PieChart from '@/components/charts/Pie'
import * as tenantType from '@/store/tenant/mutations_types'
import * as resourcePools from '@/api/resource-pool'

export default {
  components: {
    PieChart
  },
  data () {
    return {
      hostLoading: false,
      legend: ['未分配', '正在使用', '可回收'],
      serieDatas: [
        { value: 335, name: '未分配' },
        { value: 310, name: '正在使用' },
        { value: 310, name: '可回收' }
      ],
      tenantLoading: false
    }
  },
  computed: {
    ...mapState({
      tenantNumber (state) {
        return state.tenant.tenants.tenants.length
      }
    })
  },
  methods: {
    ...mapActions({
      fetchTenants: tenantType.FETCH_TENANTS
    }),
    async listHost () {
      this.hostLoading = true
      try {
        let { data } = await resourcePools.hostList()
        let undistributed = 0
        let recycled = 0
        data.forEach(function (item, index) {
          undistributed += item.status === 0 ? 1 : 0
          recycled += item.status === 3 ? 1 : 0
        })
        this.serieDatas = [
          { value: undistributed, name: '未分配' },
          { value: data.length - undistributed - recycled, name: '正在使用' },
          { value: recycled, name: '可回收' }
        ]
      } finally {
        this.hostLoading = false
      }
    },
    async getTenants () {
      this.tenantLoading = true
      try {
        await this.fetchTenants()
      } finally {
        this.tenantLoading = false
      }
    }
  },
  mounted () {
    this.getTenants()
    this.listHost()
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
