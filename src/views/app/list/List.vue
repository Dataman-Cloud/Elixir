<template>
  <div>
    <div class="btn-group">
      <el-button-group>
        <router-link class="pan-btn pink-btn" to="/app/create">
          <el-button type="primary"><i class="el-icon-plus"></i> 创建应用</el-button>
        </router-link>
        <el-button type="primary" @click="openExtend" v-if="currentRow && currentRow.appruntatus !== 'Suspended'"><i
          class="el-icon-edit"></i> 扩展应用
        </el-button>
        <el-button type="primary" @click="openDelete" v-if="currentRow"><i class="el-icon-close"></i> 删除应用</el-button>
        <el-button type="primary" @click="updateApp" v-if="currentRow"><i class="fa fa-refresh"></i> 更新应用</el-button>
        <el-button type="primary" @click="reverse('start')" v-if="currentRow && currentRow.appruntatus === 'Suspended'">
          <i class="fa fa-play"></i> 启动
        </el-button>
        <el-button type="primary" @click="reverse('stop')" v-if="currentRow && currentRow.appruntatus !== 'Suspended'">
          <i class="fa fa-stop"></i>
          停止
        </el-button>
      </el-button-group>

      <el-button-group style="display: flex">
        <el-input v-model="searchWord" placeholder="请输入内容"></el-input>
        <el-button type="primary"><i class="fa fa-refresh"></i></el-button>
      </el-button-group>
    </div>

    <extend-dialog @ok="extendOk" ref="extendDialog"></extend-dialog>

    <el-table
      :data="apps"
      highlight-current-row
      stripe
      row-key="id"
      v-loading="listLoading"
      @current-change="handleCurrentChange"
      style="width: 100%">
      <el-table-column property="id" label="名称" width="150">
        <template scope="app">
          <router-link :to="{name: '应用详情', params:{id : app.row.id}}">{{app.row.id}}</router-link>
        </template>
      </el-table-column>
      <el-table-column
        property="labels.VCLUSTER"
        label="所属集群">
      </el-table-column>
      <el-table-column
        property="instances"
        label="实例个数">
      </el-table-column>
      <el-table-column
        property="appruntatus"
        label="运行状态">
      </el-table-column>
      <el-table-column
        label="健康状态">
      </el-table-column>
      <el-table-column label="更新时间" min-width="120">
        <template scope="scope">
          <span>{{scope.row.versionInfo.lastConfigChangeAt | formatTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Confirm from '@/utils/confirm'
  import ExtendDialog from '@/views/app/modals/ExtendDialog'
  import * as type from '@/store/app/mutations_types'
  import * as app from '@/api/app'

  export default {
    components: {
      ExtendDialog
    },
    data () {
      return {
        listLoading: false,
        currentRow: null,
        searchWord: ''
      }
    },
    computed: {
      ...mapState({
        apps (state) {
          return state.app.apps.apps
        },
        total (state) {
          return state.app.apps.total
        }
      })
    },
    methods: {
      handleCurrentChange (val) {
        this.currentRow = val
      },
      listApp () {
        return this.$store.dispatch(type.FETCH_APPS).then(() => {
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
      },
      updateApp () {
        if (this.currentRow) {
          this.$router.push({name: '更新应用', params: {id: this.currentRow.id}})
        } else {
          this.$notify({message: '尚未选中应用'})
        }
      },
      openDelete () {
        if (this.currentRow) {
          Confirm.open(`确认删除 ${this.currentRow.id} 应用?`)
            .then(() => {
              app.deleteApp(this.currentRow.id)
                .then(() => {
                  this.$notify({message: '删除成功'})
                  this.$store.dispatch(type.FETCH_APPS)
                })
            })
        } else {
          this.$notify({message: '尚未选中应用'})
        }
      },
      openExtend () {
        this.currentRow ? this.$refs.extendDialog.open(this.currentRow) : this.$notify({message: '尚未选中应用'})
      },
      extendOk (res) {
        app.extend(this.currentRow.id, res)
          .then(data => this.$store.dispatch(type.FETCH_APPS))
      },
      reverse (action) {
        if (this.currentRow) {
          Confirm.open(`确认${action === 'start' ? '启动' : '停止'} ${this.currentRow.id} 应用?`)
            .then(() => {
              app[action](this.currentRow.id)
                .then(() => {
                  this.$notify({message: `${action === 'start' ? '启动' : '停止'}成功`})
                  this.$store.dispatch(type.FETCH_APPS)
                })
            })
        } else {
          this.$notify({message: '尚未选中应用'})
        }
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
