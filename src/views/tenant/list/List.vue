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
    <Add-Host-Dialog ref="addHost"></Add-Host-Dialog>

    <el-table :data="filterTenants" style="width: 100%">
      <el-table-column type="expand">
        <template scope="tenant">
          <div class="btn-group">
            <span></span>
            <span>
              <el-button type="primary" @click="updateTenant(tenant.row.id)">
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
              <el-button type="primary" @click="addHost(tenant.row)">
                <i class="el-icon-plus"></i> 添加主机
              </el-button>
              <el-button type="danger" :disabled="!currentRow" @click="delUHost(tenant.row)">
                <i class="el-icon-minus"></i> 移除主机
              </el-button>
            </span>
          </div>
          <el-table ref="multipleTable" :data="tenant.row.hosts" @selection-change="handleCurrentChange" border tooltip-effect="dark" style="width: 100%">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="ip" label="主机" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template scope="scope">
                <el-button size="small">删除</el-button>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="租户名称" prop="name">
      </el-table-column>
      <el-table-column label="管理员名称" prop="adminName">
      </el-table-column>
      <el-table-column label="状态" prop="status">
      </el-table-column>
      <el-table-column label="创建时间" prop="created">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Confirm from '@/utils/confirm'
import CreateDialog from '@/views/tenant/modals/CreateDialog'
import * as type from '@/store/tenant/mutations_types'
import * as tenant from '@/api/tenant'
import AddHostDialog from '@/views/cluster/modals/AddDialog'
export default {
  components: {
    CreateDialog,
    AddHostDialog
  },
  data () {
    return {
      listLoading: false,
      searchWord: '',
      currentRows: []
    }
  },
  computed: {
    ...mapState({
      tenants (state) {
        return state.tenant.tenants.tenants
      }
    }),
    filterTenants: function () {
      return this.searchWord ? this.tenants.filter(tenant => tenant.name.toLowerCase().includes(this.searchWord)) : this.tenants
    },
    currentRow: function () {
      return this.currentRows.length === 1 ? this.currentRows[0] : null
    }
  },
  methods: {
    ...mapActions({
      fetchTenants: type.FETCH_TENANTS
    }),
    addHost () {
      this.$refs.addHost.open(name)
    },
    async delHost (group) {
      await Confirm.open(`确认移除该主机?`)
      this.$notify({ message: '删除成功' })
    },
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
    reload () {
      this.getTenants()
    },
    openCreate () {
      this.$refs.createDialog.open()
    },
    handleCurrentChange (val) {
      this.currentRows = val
    },
    updateTenant (id) {
      this.$refs.createDialog.open(id)
    }
  },
  created () {
    this.getTenants()
  }
}

</script>
<style scoped>

</style>
