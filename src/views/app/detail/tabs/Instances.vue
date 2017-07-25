<template>
  <div>
    <div class="btn-group">
      <span>
        <el-button type="primary" @click="reload"><i class="glyphicon glyphicon-repeat"></i></el-button>
        <!--<a class="pan-btn pink-btn" :href="stdObj.stdout">-->
          <!--<el-button type="primary" :disabled="!currentRow"><i class="el-icon-plus"></i> stdout 日志</el-button>-->
        <!--</a>-->
        <!--<a class="pan-btn pink-btn" :href="stdObj.stderr">-->
          <!--<el-button type="primary" :disabled="!currentRow"><i class="el-icon-plus"></i> stderr 日志</el-button>-->
        <!--</a>-->
      </span>
    </div>

    <el-table
      :data="tasks"
      stripe border
      v-loading="listLoading"
      @selection-change="handleCurrentChange"
      style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column property="name" label="实例名称" width="150"></el-table-column>
      <el-table-column
        property="status"
        label="状态">
      </el-table-column>
      <el-table-column
        property="healthy"
        label="健康">
      </el-table-column>
      <el-table-column
        property="version"
        label="版本">
      </el-table-column>
      <el-table-column label="更新时间" min-width="120">
        <template scope="scope">
          <span>{{scope.row.updated | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import * as type from '@/store/app/mutations_types'
//  import baseUrl from 'baseUrl'

  export default {
    data () {
      return {
        currentRows: [],
        listLoading: false
      }
    },
    computed: {
      ...mapState({
        tasks ({app}) {
          return app.app.tasks
        }
      }),
      currentRow: function () {
        return this.currentRows.length === 1 ? this.currentRows[0] : null
      }
//      stdObj: function () {
//        return this.currentRow ? {
//          stderr: `${baseUrl}/v1/apps/stdlog?hostip=${this.currentRow.host}&slaveid=${this.currentRow.slaveId}&taskid=${this.currentRow.id}&logtype=stderr`,
//          stdout: `${baseUrl}/v1/apps/stdlog?hostip=${this.currentRow.host}&slaveid=${this.currentRow.slaveId}&taskid=${this.currentRow.id}&logtype=stdout`
//        } : {
//          stderr: 'javascript:void(0);',
//          stdout: 'javascript:void(0);'
//        }
//      }
    },
    methods: {
      handleCurrentChange (val) {
        this.currentRows = val
      },
      reload () {
        this.listLoading = true
        this.$store.dispatch(type.FETCH_APP, this.$route.params.id)
          .then(() => (this.listLoading = false))
          .catch(() => (this.listLoading = false))
      }
    }
  }
</script>
<style scoped>
  .btn-group {
    justify-content: space-between;
  }
</style>
