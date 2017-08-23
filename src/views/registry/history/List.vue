<template>
  <div>
    <div class="btn-group">
      <span>
        <el-button type="primary"><i class="glyphicon glyphicon-repeat"></i></el-button>
      </span>
      <el-button-group style="display: flex">
        <el-input class="el-input-search" icon="search" placeholder="请输入内容"></el-input>
      </el-button-group>
    </div>

    <el-table
      :data="logs"
      border
      v-loading="listLoading"
      style="width: 100%">
      <el-table-column
        sortable show-overflow-tooltip
        width="200"
        property="username"
        label="用户名">
      </el-table-column>
      <el-table-column
        property="repo_name"
        sortable label="镜像名称">
      </el-table-column>
      <el-table-column
        property="repo_tag"
        sortable label="标签">
      </el-table-column>
      <el-table-column
        property="operation"
        sortable label="操作">
      </el-table-column>
      <el-table-column
        property="op_time"
        sortable label="时间戳">
        <template scope="scope">
          <span>{{scope.row.op_time | formatTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import * as type from '@/store/registry/mutations_types'

  export default {
    data () {
      return {
        listLoading: false
      }
    },
    computed: {
      ...mapState({
        logs (state) {
          return state.registry.logs.logs
        }
      })
    },
    methods: {
      ...mapActions({
        fetchLogs: type.FETCH_LOGS
      })
    },
    created () {
      this.listLoading = true
      this.fetchLogs()
        .then(() => {
          this.listLoading = false
        })
    }
  }
</script>

<style>
.btn-group {
    justify-content: space-between;
  }
</style>
