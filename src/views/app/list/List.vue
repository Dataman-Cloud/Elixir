<template>
  <div>
    <div class="btn-group">
      <router-link class="pan-btn pink-btn" to="/app/create">
        <el-button type="primary">创建应用</el-button>
      </router-link>
    </div>

    <el-table
      :data="apps"
      highlight-current-row
      v-loading="listLoading"
      @current-change="handleCurrentChange"
      style="width: 100%">
      <el-table-column property="id" label="名称" width="150">
        <template scope="app">
          <router-link :to="{name: '应用详情', params:{id : app.row.id.substr(1)}}">{{app.row.id}}</router-link>
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
        property=""
        label="运行状态">
      </el-table-column>
      <el-table-column
        property=""
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
  import * as type from '@/store/app/mutations_types'

  export default {
    data () {
      return {
        listLoading: false,
        currentRow: null
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
        })
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
    display: flex;
    margin-bottom: 10px;
  }

  .btn-group a:not(:first-child) {
    margin: 0 5px;
  }

</style>
