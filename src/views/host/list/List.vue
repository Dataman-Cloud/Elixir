<template>
  <div>
    <el-table stripe :data="hostList" border tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="label" label="主机" show-overflow-tooltip>
        </el-table-column>
        <!-- <el-table-column label="操作" width="250">
          <template scope="scope">
            <el-button size="small" @click="delHost(scope.row.hostname)">删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import * as type from '@/store/host/mutations_types'
import * as tenant from '@/store/tenant/mutations_types'
// import * as host from '@/api/host'
// import * as tenant from '@/api/tenant'
export default {
  data () {
    return {
      listLoading: false
    }
  },
  computed: {
    ...mapState({
      hostList (state) {
        return this.isPlatform ? state.tenant.hosts.hosts : state.host.hosts.hosts
      }
    }),
    ...mapGetters([
      'isPlatform'
    ])
  },
  methods: {
    ...mapActions({
      getHosts: type.FETCH_HOSTS,
      tenantHosts: tenant.FETCH_TENANT_HOSTS
    }),
    async listCluster () {
      this.listLoading = true
      this.isPlatform ? await this.tenantHosts() : await this.getHosts()
      this.listLoading = false
    },
    reload () {
      this.listCluster()
    }
  },
  mounted () {
    this.listCluster()
    console.log('platform')
    console.log(this.hostList)
  }
}
</script>
<style scoped>
.btn-group {
  justify-content: space-between;
}

.cluster-card {
  width: 100%;
  margin-bottom: 20px;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin: 13px 0;
  line-height: 12px;
}

.clusterDetail {
  padding: 0;
  float: right;
}

.cluster-app {
  text-align: right;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.cluster-host {
  text-align: right;
  font-size: 35px;
  height: 76px;
  line-height: 76px;
  font-weight: 200;
  color: #666;
}

.cluster-title {
  font-size: 25px;
}
</style>
