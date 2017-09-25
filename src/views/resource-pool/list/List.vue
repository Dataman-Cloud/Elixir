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
    <maintain-gateway-dialog ref="maintain" @close="closeMaintain"></maintain-gateway-dialog>
  </div>
</template>
<script>
import * as resourcePools from '@/api/resource-pool'
import maintainGatewayDialog from '@/views/resource-pool/modals/maintainGatewayDialog'
import Confirm from '@/utils/confirm'

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
        this.hostList = this.transformObjToArr(data)
      } finally {
        this.listLoading = false
      }
    },
    closeMaintain () {
      this.listHost()
    },
    async delHost (ip) {
      await Confirm.open(`确认移除该主机吗?`)
      resourcePools.delHost({'ip': ip})
      this.$notify({ message: '移除成功' })
      await this.listHost()
    },
    distribute () {
      this.$router.push({name: '租户管理'})
    },
    handleCommand (command) {
      this[command.type](command.data)
    },
    maintain (ip) {
      this.$refs.maintain.open(ip)
    },
    transformObjToArr (obj, attr) {
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
    this.listHost()
  }
}
</script>
