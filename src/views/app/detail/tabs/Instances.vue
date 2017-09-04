<template>
  <div>
    <div class="btn-group">
      <span>
        <el-button type="primary" @click="reload">
          <i class="glyphicon glyphicon-repeat"></i>
        </el-button>
        <a class="pan-btn pink-btn margin-10" :href="stdObj.stdout">
          <el-button type="primary" :disabled="!currentRow">
            <i class="el-icon-plus"></i> stdout 日志</el-button>
        </a>
        <a class="pan-btn pink-btn margin-10" :href="stdObj.stderr">
          <el-button type="primary" :disabled="!currentRow">
            <i class="el-icon-plus"></i> stderr 日志</el-button>
        </a>
      </span>
    </div>

    <el-table :data="tasks" stripe border v-loading="listLoading" @selection-change="handleCurrentChange" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column property="name" label="实例名称" width="200">
        <template scope="scope">
          <router-link v-if="scope.row.agentId" class="ellipsis" :to="{name: '实例详情', params: { host: scope.row.ip, id: scope.row.id, slaveId: scope.row.agentId}}">
            {{scope.row.name}}
          </router-link>
          <span v-else class="ellipsis">{{scope.row.name}}</span>
          <small v-if="scope.row.ports && scope.row.ports.length">IP:{{scope.row.ip}}:
            <a v-for="(port, index) in scope.row.ports" :key="index" :href="'http://'+ scope.row.ip + ':' + port" target="_blank"> {{port}} </a>
          </small>
        </template>
      </el-table-column>
      <el-table-column property="status" label="状态">
      </el-table-column>
      <el-table-column property="healthy" label="健康">
      </el-table-column>
      <el-table-column property="version" label="版本">
      </el-table-column>
      <el-table-column label="创建" min-width="120">
        <template scope="scope">
          <span>{{scope.row.created | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import * as type from '@/store/app/mutations_types'
import baseUrl from 'baseUrl'

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
    },
    stdObj: function () {
      return this.currentRow ? {
        stderr: `${baseUrl}/v1/node/apps/stdlog?hostip=${this.currentRow.ip}&slaveid=${this.currentRow.agentId}&taskid=${this.currentRow.id}&logtype=stderr`,
        stdout: `${baseUrl}/v1/node/apps/stdlog?hostip=${this.currentRow.ip}&slaveid=${this.currentRow.agentId}&taskid=${this.currentRow.id}&logtype=stdout`
      } : {
        stderr: 'javascript:void(0);',
        stdout: 'javascript:void(0);'
      }
    }
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
.margin-10 {
  margin-left: 10px
}
</style>
