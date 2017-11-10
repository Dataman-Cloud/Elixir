<template>
  <div>
    <el-table stripe :data="hostList" border tooltip-effect="dark" style="width: 100%">
      <el-table-column type="expand">
        <template scope="resourcepools">
          <el-table :data="resourcepools.row.detail" border tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="name" label="名称" width="120">
            </el-table-column>
            <el-table-column prop="sum" label="总量" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="used" label="使用量" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="rest" label="剩余量" show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="hostname" label="IP">
      </el-table-column>
      <el-table-column label="集群">
        <template scope="scope">
          <span>{{scope.row.attributes.vcluster || '-'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="version" label="Mesos版本" sortable width="130">
        <template scope="scope">
          <span>{{scope.row.version || '-'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="tenant" label="所属租户" sortable>
        <template scope="scope">
          <span>{{scope.row.tenantName || '-'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="tenant" label="网卡" sortable>
        <template scope="scope">
          <span>{{scope.row.networkCard || '-'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" sortable>
        <template scope="scope">
          <span>{{scope.row.createTime | formatTime('{y}-{m}-{d} {h}:{i}:{s}') || '-'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="分配时间" sortable>
        <template scope="scope">
          <span>{{scope.row.assignTime | formatTime('{y}-{m}-{d} {h}:{i}:{s}') || '-'}}</span>
        </template>
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
        return this.transformObjToArr(state.host.hosts.hosts)
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
      await host.removeHost({ ip: ip })
      this.$notify({ message: '移除成功' })
      this.listHosts()
    },
    transformObjToArr (obj) {
      return obj.map(item => {
        item.detail = [{
          name: 'cpus',
          sum: item.resources.cpus,
          used: item.used_resources.cpus,
          rest: item.resources.cpus - item.used_resources.cpus
        },
        {
          name: '内存(MB)',
          sum: item.resources.mem,
          used: item.used_resources.mem,
          rest: item.resources.mem - item.used_resources.mem
        }]
        return item
      })
    }
  },
  mounted () {
    this.listCluster()
  }
}
</script>
