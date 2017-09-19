<template>
  <div>
    <el-table stripe :data="hostList" border tooltip-effect="dark" style="width: 100%">
      <el-table-column prop="hostname" label="IP">
      </el-table-column>
      <el-table-column label="集群">
        <template scope="scope">
          <span v-if="scope.row.attributes.vcluster !== undefined">{{scope.row.attributes.vcluster}}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop="version" label="Mesos版本" sortable width="130">
        <template scope="scope">
          <span v-if="scope.row.version">{{scope.row.version}}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop="tenant" label="所属租户" sortable>
        <template scope="scope">
          <span v-if="scope.row.tenantName">{{scope.row.tenantName}}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" sortable>
        <template scope="scope">
          <span v-if="scope.row.createTime">{{scope.row.createTime | formatTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="分配时间" sortable>
        <template scope="scope">
          <span v-if="scope.row.assignTime">{{scope.row.assignTime | formatTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
          <template scope="scope">
            <el-dropdown style="margin-left: 10px" trigger="click" @command="handleCommand">
              <el-button size="small" type="primary">
                更多
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{type: 'distribute'}" v-if="scope.row.status === '0'">分配</el-dropdown-item>
                <el-dropdown-item :command="{type: 'delHost', data: scope.row.hostname}" v-if="scope.row.status === '3'">回收</el-dropdown-item>
                <el-dropdown-item :command="{type: 'maintain', data: scope.row.hostname}">维护</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
    </el-table>
    <maintain-gateway-dialog ref="maintain"></maintain-gateway-dialog>
  </div>
</template>
<script>
import * as resourcePools from '@/api/resource-pool'
import maintainGatewayDialog from '@/views/resource-pool/modals/maintainGatewayDialog'

export default {
  components: {
    maintainGatewayDialog
  },
  data () {
    return {
      hostList: [],
      listLoading: false
    }
  },
  methods: {
    async listHost () {
      this.listLoading = true
      try {
        let {data} = await resourcePools.hostList()
        this.hostList = data
      } finally {
        this.listLoading = false
      }
    },
    delHost (ip) {
      resourcePools.delHost({'ip': ip})
    },
    distribute () {
      this.$router.push({name: '租户管理'})
    },
    handleCommand (command) {
      this[command.type](command.data)
    },
    maintain (ip) {
      this.$refs.maintain.open(ip)
    }
  },
  mounted () {
    this.listHost()
  }
}
</script>
