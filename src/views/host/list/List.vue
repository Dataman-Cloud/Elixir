<template>
  <div>
    <el-table stripe :data="hostList" border tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="ip" label="主机" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="assignTime" label="分配时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="集群" show-overflow-tooltip>
          <template scope="scope">
            <span>{{scope.row.clusterLabel || '-'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="networkCard" label="网卡" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" width="250">
              <template scope="scope">
                <el-button size="small" @click="removeHost(scope.row.ip)" :disabled="scope.row.status !== '2'">移除</el-button>
              </template>
          </el-table-column>
      </el-table>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import * as type from '@/store/host/mutations_types'
import * as host from '@/api/host'

export default {
  data () {
    return {
      listLoading: false
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
    async listCluster () {
      this.listLoading = true
      try {
        await this.listHosts()
      } finally {
        this.listLoading = false
      }
    },
    async removeHost (ip) {
      await host.removeHost({ip: ip})
      this.$notify({ message: '移除成功' })
      this.listHosts()
    }
  },
  mounted () {
    this.listCluster()
  }
}
</script>
