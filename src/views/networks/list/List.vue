<template>
  <div>
    <div class="btn-group">
      <span>
        <el-button type="primary" @click="reload">
          <span class="glyphicon glyphicon-repeat" aria-hidden="true"></span>
        </el-button>
        <el-button type="primary" @click="openCreate">
          <i class="el-icon-plus"></i> 添加网络</el-button>
      </span>
      <el-button-group style="display: flex">
        <el-input class="el-input-search" icon="search" v-model="searchWord" placeholder="请输入内容"></el-input>
      </el-button-group>
    </div>

    <create-dialog ref="createDialog" @close="reload"></create-dialog>

    <el-table :data="filterNetworks" style="width: 100%" v-loading="listLoading">
      <el-table-column type="expand">
        <template scope="networks">
          <el-table :data="networks.row.subnets" border tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="netname" label="netname" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="cidr" label="cidr" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="gateway" label="gateway" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="createtime" label="createtime" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="modifytime" label="modifytime" show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="IP" prop="host.ip" sortable>
      </el-table-column>
      <el-table-column label="集群" prop="host.clusterLabel" sortable>
      </el-table-column>
      <el-table-column label="租户名称" prop="host.tenantName" sortable
      </el-table-column>
      <el-table-column label="网卡" prop="host.networkCard" sortable>
      </el-table-column>
      <el-table-column label="创建时间" prop="host.created" sortable>
      </el-table-column>
      <el-table-column label="分配时间" prop="host.assignTime" sortable>
        <template scope="scope">
           <span v-if="scope.row.host.assignTime">{{scope.row.host.assignTime}}</span>
           <span v-else>-</span>
         </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import CreateDialog from '@/views/networks/modals/CreateDialog'
import * as type from '@/store/networks/mutations_types'

export default {
  components: {
    CreateDialog
  },
  data () {
    return {
      listLoading: false,
      searchWord: ''
    }
  },
  computed: {
    ...mapState({
      networksList (state) {
        return state.networks.networks.networks
      }
    }),
    filterNetworks: function () {
      return this.searchWord ? this.networksList.filter(network => network.host.ip.toLowerCase().includes(this.searchWord)) : this.networksList
    }
  },
  methods: {
    ...mapActions({
      fetchNetworks: type.FETCH_NETWORKS
    }),
    async getNetworks () {
      this.listLoading = true
      try {
        await this.fetchNetworks()
      } finally {
        this.listLoading = false
      }
    },
    openCreate () {
      this.$refs.createDialog.open()
    },
    reload () {
      this.getNetworks()
    }
  },
  created () {
    this.getNetworks()
  }
}

</script>
<style scoped>

</style>
