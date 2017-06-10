<template>
  <div>
    <div class="btn-group">
      <el-button-group>
        <a class="pan-btn pink-btn" :href="stdObj.stdout">
          <el-button type="primary"><i class="el-icon-plus"></i> stdout 日志</el-button>
        </a>

        <a class="pan-btn pink-btn" :href="stdObj.stderr">
          <el-button type="primary"><i class="el-icon-plus"></i> stderr 日志</el-button>
        </a>
      </el-button-group>

      <el-button type="primary" @click="reload()"><i class="fa fa-refresh"></i></el-button>
    </div>

    <el-table
      :data="tasks"
      stripe
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
  import * as type from '@/store/app/mutations_types'
  import * as constant from '@/config/constant'

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
      }),
      stdObj: function () {
        return this.currentRow ? {
          stderr: `${constant.BASE_URL}/v1/apps/stdlog?hostip=${this.currentRow.host}&slaveid=${this.currentRow.slaveId}&taskid=${this.currentRow.id}&logtype=stderr`,
          stdout: `${constant.BASE_URL}/v1/apps/stdlog?hostip=${this.currentRow.host}&slaveid=${this.currentRow.slaveId}&taskid=${this.currentRow.id}&logtype=stdout`
        } : {
          stderr: 'javascript:void(0);',
          stdout: 'javascript:void(0);'
        }
      }
    },
    methods: {
      handleCurrentChange (val) {
        this.currentRow = val
      },
      reload () {
        this.$store.dispatch(type.FETCH_APP, this.$route.params.id)
      }
    }
  }
</script>
<style scoped>
  .btn-group {
    justify-content: space-between;
  }
</style>
