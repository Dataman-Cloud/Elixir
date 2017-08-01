<template>
  <div>
    <div class="btn-group">
      <span>
        <el-button type="primary" @click="reload">
          <i class="glyphicon glyphicon-repeat"></i>
        </el-button>
      </span>
    </div>

    <el-table :data="tasks" stripe border v-loading="listLoading" @selection-change="handleCurrentChange" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column property="name" label="实例名称" width="150" sortable>
        <template scope="scope">
          <span>{{scope.row.name.replace(/\./g, '-')}}</span>
        </template>
      </el-table-column>
      <el-table-column property="status" label="状态">
      </el-table-column>
      <el-table-column property="healthy" label="健康">
      </el-table-column>
      <el-table-column property="version" label="版本">
      </el-table-column>
      <el-table-column label="地址" min-width="80">
        <template scope="scope">
          <span>IP: {{scope.row.ip ? scope.row.ip : '-'}} 端口: {{scope.row.port ? scope.row.port : '-'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" min-width="100">
        <template scope="scope">
          <span>{{scope.row.updated | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import * as type from '@/store/app/mutations_types'

export default {
  data () {
    return {
      currentRows: [],
      listLoading: false
    }
  },
  computed: {
    ...mapState({
      tasks ({ app }) {
        return app.app.tasks
      }
    }),
    currentRow: function () {
      return this.currentRows.length === 1 ? this.currentRows[0] : null
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.currentRows = val
    },
    async reload () {
      this.listLoading = true
      await this.$store.dispatch(type.FETCH_APP, this.$route.params.id).catch(() => (this.listLoading = false))
      this.listLoading = false
    }
  }
}
</script>
<style scoped>
.btn-group {
  justify-content: space-between;
}
</style>
