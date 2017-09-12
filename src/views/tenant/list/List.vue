<template>
  <div>
    <div class="btn-group">
      <span>
        <el-button type="primary" @click="reload">
          <span class="glyphicon glyphicon-repeat" aria-hidden="true"></span>
        </el-button>
        <el-button type="primary" @click="openCreate">
          <i class="el-icon-plus"></i> 新建租户</el-button>
      </span>
      <el-button-group style="display: flex">
        <el-input class="el-input-search" icon="search" v-model="searchWord" placeholder="请输入内容"></el-input>
      </el-button-group>
    </div>

    <create-dialog ref="createDialog" @close="reload"></create-dialog>
    <Add-Host-Dialog ref="addHost" @close="closeHost" :hostList="hostList"></Add-Host-Dialog>

    <el-table :data="filterTenants" style="width: 100%">
      <el-table-column type="expand">
        <template scope="tenant">
          <div class="btn-group">
            <span></span>
            <span>
              <el-button type="primary" @click="updateTenant(tenant.row)">
                <i class="el-icon-edit"></i> 更新租户
              </el-button>
              <el-button type="danger" @click="delTenant(tenant.row.id)">
                <i class="el-icon-delete"></i> 删除租户
              </el-button>
            </span>
          </div>
          <el-badge>主机列表</el-badge>
          <div class="btn-group">
            <span>
              <el-button type="primary" @click="addHost(tenant.row.name,tenant.row.id)">
                <i class="el-icon-plus"></i> 添加主机
              </el-button>
            </span>
          </div>
          <el-table :data="tenant.row.hostList" border tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="ip" label="主机" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="created" label="添加时间" show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="租户名称" prop="name">
      </el-table-column>
      <el-table-column label="管理员名称" prop="adminName">
      </el-table-column>
      <!-- <el-table-column label="状态" prop="status">
        </el-table-column> -->
      <el-table-column label="创建时间" prop="created">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Confirm from '@/utils/confirm'
import CreateDialog from '@/views/tenant/modals/CreateDialog'
import AddHostDialog from '@/views/cluster/modals/AddHostDialog'
import * as type from '@/store/tenant/mutations_types'
import * as hostType from '@/store/host/mutations_types'
import * as tenant from '@/api/tenant'
export default {
  components: {
    CreateDialog,
    AddHostDialog
  },
  data () {
    return {
      listLoading: false,
      searchWord: '',
      checkedIp: [],
      tenantId: -1
    }
  },
  computed: {
    ...mapState({
      tenants (state) {
        return state.tenant.tenants.tenants
      },
      hostList (state) {
        return state.tenant.hosts.hosts
      },
      ...mapGetters([
        'isPlatform'
      ])
    }),
    filterTenants: function () {
      return this.searchWord ? this.tenants.filter(tenant => tenant.name.toLowerCase().includes(this.searchWord)) : this.tenants
    }
  },
  methods: {
    ...mapActions({
      fetchTenants: type.FETCH_TENANTS,
      tenantHosts: type.FETCH_TENANT_HOSTS,
      getHosts: hostType.FETCH_HOSTS
    }),
    async delTenant (id) {
      await Confirm.open(`确认删除该租户?`)
      await tenant.delTenant(id)
      this.$notify({ message: '删除成功' })
      this.getTenants()
    },
    async getTenants () {
      this.listLoading = true
      try {
        await this.fetchTenants()
      } finally {
        this.listLoading = false
      }
    },
    async addHost (name, id) {
      this.isPlatform ? await this.tenantHosts() : await this.getHosts()
      this.tenantId = id
      this.$refs.addHost.open(name)
    },
    async closeHost (checkedIp) {
      this.checkedIp = checkedIp
      const checkedIps = this.transformHosts(this.hostList)
      await tenant.addHost(checkedIps)
      this.$notify({ message: '添加成功' })
      await this.getTenants()
    },
    openCreate () {
      this.$refs.createDialog.open()
    },
    reload () {
      this.getTenants()
    },
    transformHosts (hosts = []) {
      return hosts.map((item, i) => {
        if (this.checkedIp.indexOf(i) !== -1) {
          return {
            'ip': item.label,
            'tenantId': this.tenantId
          }
        }
      })
    },
    updateTenant (name) {
      this.$refs.createDialog.open(name)
    }
  },
  created () {
    this.getTenants()
  }
}

</script>
<style scoped>

</style>
