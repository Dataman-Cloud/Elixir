<template>
  <div>
    <div class="btn-group">
      <span>
        <el-button type="primary" @click="reload">
          <span class="glyphicon glyphicon-repeat" aria-hidden="true"></span>
        </el-button>
        <el-button type="primary" @click="openCreate">
          <i class="ion-ios-plus-outline"></i> 创建应用</el-button>
        <el-button type="primary" @click="openExtend" :disabled="!currentRow">
          <i class="el-icon-edit"></i> 扩展应用
        </el-button>
        <el-button type="primary" @click="openUpdate" :disabled="!currentRow">
          <i class="fa fa-refresh"></i>
          更新应用
        </el-button>
        <el-button type="primary" @click="start" :disabled="!currentRow">
          <i class="fa fa-play-circle-o"></i> 启动
        </el-button>
        <el-button type="primary" @click="stop" :disabled="!currentRow">
          <i class="fa fa-power-off"></i>
          停止
        </el-button>
        <el-button type="danger" @click="openDelete" :disabled="!currentRow">
          <i class="ion-ios-minus-outline"></i> 删除应用
        </el-button>
      </span>

      <el-button-group style="display: flex">
        <el-input class="el-input-search" icon="search" v-model="searchWord" placeholder="请输入应用名称"></el-input>
      </el-button-group>
    </div>

    <extend-dialog @ok="extendOk" ref="extendDialog"></extend-dialog>
    <create-dialog @ok="createOk" ref="createDialog"></create-dialog>

    <el-table :data="filterApps" border row-key="id" v-loading="listLoading" @selection-change="handleCurrentChange" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column property="name" label="应用" width="200" sortable>
        <template scope="app">
          <router-link :title="app.row.id" class="ellipsis" :to="{name: '应用详情', params:{id : app.row.id}}">{{(app.row.id).replace(/\./g,'-')}}</router-link>
        </template>
      </el-table-column>
      <el-table-column property="status" width="120" label="运行状态"></el-table-column>
      <el-table-column property="network" width="120" label="网络模式"></el-table-column>
      <el-table-column property="cluster" label="集群"></el-table-column>
      <el-table-column label="健康状态">
        <template scope="app">
          <span>总数: </span>
          <i>{{app.row.health.total}} </i>
          <span> 健康: </span>
          <i>{{app.row.health.healthy}} </i>
          <span> 不健康: </span>
          <i>{{app.row.health.unhealthy}} </i>
          <span> 未设置: </span>
          <i>{{app.row.health.unset}} </i>
        </template>
      </el-table-column>
      <el-table-column property="updated" label="更新时间" min-width="80" sortable>
        <template scope="scope">
          <span>{{scope.row.updated | formatTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Confirm from '@/utils/confirm'
import ExtendDialog from '@/views/app/modals/ExtendDialog'
import CreateDialog from '@/views/app/modals/CreateDialog'
import * as type from '@/store/app/mutations_types'
import * as app from '@/api/app-swan'

export default {
  components: {
    ExtendDialog,
    CreateDialog
  },
  data () {
    return {
      listLoading: false,
      currentRows: [],
      searchWord: ''
    }
  },
  computed: {
    ...mapState({
      apps (state) {
        return state.app.apps.apps
      }
    }),
    filterApps: function () {
      return this.searchWord ? this.apps.filter(app => app.id.toLowerCase().includes(this.searchWord)) : this.apps
    },
    currentRow: function () {
      return this.currentRows.length === 1 ? this.currentRows[0] : null
    }
  },
  methods: {
    ...mapActions({
      fetchApps: type.FETCH_APPS
    }),
    extendOk (taskCount) {
      app.extend(this.currentRow.id, taskCount)
        .then(data => this.fetchApps())
    },
    createOk () {
      app.extend(this.form)
        .then(data => this.fetchApps())
    },
    handleCurrentChange (val) {
      this.currentRows = val
    },
    async listApp () {
      await this.fetchApps().catch(() => (this.listLoading = false))
      this.listLoading = false
    },
    openDelete () {
      Confirm.open(`确认删除应用?`)
        .then(() => {
          app.deleteApp(this.currentRow.id)
            .then(() => {
              this.$notify({ message: '删除成功' })
              this.fetchApps()
            })
        })
    },
    openExtend () {
      this.$refs.extendDialog.open(this.currentRow)
    },
    openCreate () {
      this.$refs.createDialog.open()
    },
    openUpdate () {
      this.$refs.createDialog.open(this.currentRow.id)
    },
    async reload () {
      this.listLoading = true
      await this.fetchApps().catch(() => (this.listLoading = false))
      this.listLoading = false
    },
    start () {
      if (this.currentRow.status === 'unavailable') {
        Confirm.open(`确认启动 ${this.currentRow.id} 应用?`)
          .then(() => {
            app.start(this.currentRow.id)
              .then(() => {
                this.$notify({ message: `${this.currentRow.id} 启动成功` })
                this.fetchApps()
              })
          })
      } else {
        this.$notify({ message: `${this.currentRow.id} 已运行` })
      }
    },
    stop () {
      if (this.currentRow.status !== 'unavailable') {
        Confirm.open(`确认停止 ${this.currentRow.id} 应用?`)
          .then(() => {
            app.stop(this.currentRow.id)
              .then(() => {
                this.$notify({ message: `${this.currentRow.id} 已停止` })
                this.fetchApps()
              })
          })
      } else {
        this.$notify({ message: `${this.currentRow.id} 已停止` })
      }
    },
    updateApp () {
      this.$router.push({ name: '更新应用', params: { id: this.currentRow.id } })
    }
  },
  mounted () {
    this.listLoading = true
    this.listApp()
      .then(() => {
        this.listLoading = false
      })
  }
}
</script>

<style scoped>
.btn-group {
  justify-content: space-between;
}
</style>
