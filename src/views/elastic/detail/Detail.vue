<template>
  <div>
    <div class="btn-group">
      <span>
        <el-button type="primary" @click="reload"><i class="glyphicon glyphicon-repeat"></i></el-button>
      </span>
      <el-button-group style="display: flex">
        <el-input class="el-input-search" icon="search" v-model="listQuery.search" placeholder="请输入内容"
                  @change="searchChange"></el-input>
      </el-button-group>
    </div>

    <el-table
      :data="histories"
      border
      row-key="uid"
      v-loading="listLoading"
      style="width: 100%">
      <el-table-column
        prop="app_id"
        label="应用名称">
      </el-table-column>
      <el-table-column
        prop="step"
        label="步长"
        width="80">
      </el-table-column>
      <el-table-column
        prop="before_inst_num"
        label="扩缩前实例数"
        width="160">
      </el-table-column>
      <el-table-column
        prop="current_inst_num"
        label="扩缩后实例数"
        width="160">
      </el-table-column>
      <el-table-column
        prop="operation_time"
        label="扩容时间">
      </el-table-column>
      <el-table-column
        prop="policy_type"
        label="策略类型"
        width="120">
      </el-table-column>
      <el-table-column
        label="扩缩结果"
        width="120">
        <template scope="scope">
          <span>{{actionMap[scope.row.action]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>
    </el-table>

    <div v-if="histories" v-show="!listLoading" class="pagination-container block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     :page-sizes="pageLimit" :page-size="listQuery.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>
<script>
  import {mapState, mapActions} from 'vuex'
  import * as type from '@/store/elastic/mutations_types'

  export default {
    data () {
      return {
        listLoading: false,
        pageLimit: [100, 200, 300, 500],
        listQuery: {
          page: 1,
          pageSize: 100,
          search: this.$route.params.name
        },
        actionMap: {
          1: '扩容成功',
          2: '缩容成功',
          3: '扩容失败',
          4: '缩容失败',
          5: '缩容失败'
        }
      }
    },
    computed: {
      ...mapState({
        histories (state) {
          return state.elastic.histories.histories
        },
        total (state) {
          return state.elastic.histories.total
        }
      })
    },
    methods: {
      ...mapActions({
        fetchHistories: type.FETCH_HISTORY
      }),
      getList () {
        this.listLoading = true
        this.fetchHistories(this.listQuery).then(() => {
          this.listLoading = false
        })
      },
      handleSizeChange (val) {
        this.listQuery.pageSize = val
        this.getList()
      },
      handleCurrentChange (val) {
        this.listQuery.page = val
        this.getList()
      },
      reload () {
        this.listLoading = true
        this.fetchHistories(this.listQuery)
          .then(() => (this.listLoading = false))
      },
      searchChange () {
        this._.debounce(() => {
          this.getList(this.listQuery)
        }, 500)()
      }
    },
    created () {
      this.listLoading = true
      this.fetchHistories(this.listQuery)
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
