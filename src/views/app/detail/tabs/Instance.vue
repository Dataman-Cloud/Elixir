<template>
  <div>
    <el-table
      :data="tasks"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%">
      <el-table-column property="id" label="实例名称" width="150" show-overflow-tooltip></el-table-column>
      <el-table-column
        property=""
        label="状态">
      </el-table-column>
      <el-table-column
        property=""
        label="健康">
      </el-table-column>
      <el-table-column
        property="version"
        label="版本">
      </el-table-column>
      <el-table-column label="创建" min-width="120">
        <template scope="scope">
          <span>{{scope.row.startedAt | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import {mapState} from 'vuex'

  export default {
    data () {
      return {
        currentRow: null
      }
    },
    computed: {
      ...mapState({
        tasks (state) {
          return state.app.app.tasks
        }
      })
    },
    methods: {
      handleCurrentChange (val) {
        this.currentRow = val
      }
    }
  }
</script>
