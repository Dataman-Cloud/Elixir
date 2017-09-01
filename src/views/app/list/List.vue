<template>
  <div>
    <div class="btn-group">
      <span>
        <el-button type="primary" @click="reload">
          <span class="glyphicon glyphicon-repeat" aria-hidden="true"></span>
        </el-button>
        <el-button type="primary" @click="openCreate">
          <i class="ion-ios-plus-outline"></i> 创建应用
        </el-button>
        <el-button type="primary" @click="openUpdate" :disabled="!currentRow">
          <i class="fa fa-refresh"></i> 更新应用
        </el-button>
        <el-button type="danger" @click="openDelete" :disabled="!currentRows.length">
          <i class="ion-ios-minus-outline"></i> 删除应用
        </el-button>
        <el-dropdown trigger="click">
          <el-button type="primary">
            更多操作
            <i class="el-icon-more el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :disabled="!currentRow">
              <el-button type="text" @click="openExtend" :disabled="!currentRow">
                <i class="el-icon-edit"></i> 扩展应用
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item :disabled="disableStart">
              <el-button type="text" @click="start" :disabled="disableStart">
                <i class="fa fa-play-circle-o"></i> 启动
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item :disabled="disableStop">
              <el-button type="text" @click="stop" :disabled="disableStop">
                <i class="fa fa-power-off"></i> 停止
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item :disabled="disableCanary">
              <el-button type="text" @click="openGrayReleased" :disabled="disableCanary">
                <i class="fa fa-adjust"></i> 灰度发布
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item :disabled="disableWeight">
              <el-button type="text" @click="openWeight" :disabled="disableWeight">
                <i class="fa fa-balance-scale"></i> 权重
              </el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <el-button type="primary" :disabled="!currentRow">
                  <i class="fa fa-balance-scale"></i> 全部权重</el-button> -->
      </span>

      <el-button-group style="display: flex">
        <el-input class="el-input-search" icon="search" v-model="searchWord" placeholder="请输入应用名称"></el-input>
      </el-button-group>
    </div>

    <grayReleased-dialog @ok="grayReleasedOk" ref="grayReleasedDialog"></grayReleased-dialog>
    <extend-dialog @ok="extendOk" ref="extendDialog"></extend-dialog>
    <create-dialog @ok="createOk" ref="createDialog"></create-dialog>
    <weight-dialog @ok="weightOk" ref="weightDialog"></weight-dialog>

    <el-table :data="filterApps" border row-key="id" v-loading="listLoading" @selection-change="handleCurrentChange" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column property="id" label="应用" width="180" sortable show-overflow-tooltip>
        <template scope="app">
          <router-link :title="app.row.id" class="ellipsis" :to="{name: '应用详情', params:{id : app.row.id}}">{{app.row.id}}</router-link>
        </template>
      </el-table-column>
      <el-table-column property="cluster" label="集群" width="150"></el-table-column>
      <el-table-column property="task_count" label="实例" width="100">
        <template scope="app">
          <span v-if="app.row.progress === -1">{{app.row.task_count}}</span>
          <span v-else>{{app.row.progress}} / {{app.row.task_count}}</span>
        </template>
      </el-table-column>
      <el-table-column property="status" label="运行状态" width="100">
        <template scope="app">
          <p>{{app.row.status}}</p>
          <small v-if="app.row.operationStatus === 'canary_updating' || app.row.operationStatus === 'canary_unfinished'">(灰度中)</small>
          <small v-if="app.row.operationStatus === 'updating'">(更新中)</small>
        </template>
      </el-table-column>
      <el-table-column label="健康状态">
        <template scope="app">
          <span>总数: </span>
          <i class="app-style">{{app.row.health.total}} </i>
          <span> 健康: </span>
          <i class="app-style">{{app.row.health.healthy}} </i>
          <span> 不健康: </span>
          <i class="app-style">{{app.row.health.unhealthy}} </i>
          <span> 未设置: </span>
          <i>{{app.row.health.unset}} </i>
        </template>
      </el-table-column>
      <el-table-column property="updated" label="更新时间" min-width="80">
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
import GrayReleasedDialog from '@/views/app/modals/GrayReleasedDialog'
import weightDialog from '@/views/app/modals/WeightDialog'
import * as type from '@/store/app/mutations_types'
import * as app from '@/api/app'

export default {
  components: {
    ExtendDialog,
    CreateDialog,
    GrayReleasedDialog,
    weightDialog
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
    },
    disableCanary: function () {
      return this.currentRows.length === 1
        ? this.currentRows[0].operationStatus !== 'noop' && this.currentRows[0].operationStatus !== 'canary_unfinished' : true
    },
    disableWeight: function () {
      return this.currentRows.length === 1 ? this.currentRows[0].operationStatus !== 'canary_unfinished' : true
    },
    disableStart: function () {
      return this.currentRows.length === 1 ? this.currentRow.progress !== -1 || this.currentRow.task_count !== 0 : true
    },
    disableStop: function () {
      return this.currentRows.length === 1 ? this.currentRow.progress !== -1 || this.currentRow.task_count <= 0 : true
    }
  },
  methods: {
    ...mapActions({
      fetchApps: type.FETCH_APPS
    }),
    extendOk (res) {
      app.extend(this.currentRow.id, res)
        .then(data => this.fetchApps())
    },
    grayReleasedOk () { },
    createOk () { },
    handleCurrentChange (val) {
      this.currentRows = val
    },
    listApp () {
      return this.fetchApps().then(() => {
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    async openDelete () {
      await Confirm.open(`确认删除应用?`)
      await app.deleteApps(this.currentRows.map(app => app.id))
      this.$notify({ message: '删除成功' })
      this.fetchApps()
    },
    openExtend () {
      this.$refs.extendDialog.open(this.currentRow)
    },
    openGrayReleased () {
      this.$refs.grayReleasedDialog.open(this.currentRow)
    },
    openCreate () {
      this.$refs.createDialog.open()
    },
    openUpdate () {
      this.$refs.createDialog.open(this.currentRow.id)
    },
    openWeight () {
      this.$refs.weightDialog.open(this.currentRow.id)
    },
    reload () {
      this.listLoading = true
      this.fetchApps()
        .then(() => (this.listLoading = false))
        .catch(() => (this.listLoading = false))
    },
    weightOk (res) {

    },
    async start () {
      await Confirm.open(`确认启动 ${this.currentRow.id} 应用?`)
      await app.start(this.currentRow.id)
      this.$notify({ message: `${this.currentRow.id} 启动成功` })
      this.fetchApps()
    },
    async stop () {
      await Confirm.open(`确认停止 ${this.currentRow.id} 应用?`)
      await app.stop(this.currentRow.id)
      this.$notify({ message: `${this.currentRow.id} 已停止` })
      this.fetchApps()
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

.el-dropdown {
  margin-left: 10px;
}

.app-style {
  margin-right: 10px;
}
</style>
