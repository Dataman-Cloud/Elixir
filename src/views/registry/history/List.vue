<template>
  <div>
    <div class="btn-group">
      <span>
        <el-button type="primary"><i class="glyphicon glyphicon-repeat"></i></el-button>
      </span>
      <el-button-group style="display: flex">
        <el-input class="el-input-search"  v-model="searchName" icon="search" placeholder="请输入内容"></el-input>
      </el-button-group>
    </div>

    <el-table
      :data="filterLogs"
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
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" :current-page.sync="currentPage"  :page-size="pageSize" :total="total" @current-change="handlePageChange"
                     style="float:right;margin-top: 10px;margin-bottom: 10px;">
      </el-pagination>
    </el-col>

  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import * as type from '@/store/registry/mutations_types'

  export default {
    data () {
      return {
        listLoading: false,
        list: [],
        page: 1,
        pageSize: 20,
        total: 0,
        searchName: '',
        currentPage: 1
      }
    },
    computed: {
      ...mapState({
        logs (state) {
          return state.registry.logs.logs
        }
      }),
      filterLogs: function () {
        if (this.searchName) {
          let list = []
          // 循环比对
          for (let u of this.logs) {
            if (u.repo_name.indexOf(this.searchName) > -1) {
              list.push(u)
            }
          }
          this.list = list.slice((this.page - 1) * this.pageSize, this.page * this.pageSize)
          this.total = list.length
          this.currentPage = 1
          return this.list
        } else {
          this.list = this.logs.slice((this.page - 1) * this.pageSize, this.page * this.pageSize)
          this.total = this.logs.length
          return this.list
        }
      }
    },
    methods: {
      ...mapActions({
        fetchLogs: type.FETCH_LOGS
      }),
      handlePageChange (val) {
        console.log(val)
        this.page = val
      }
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
