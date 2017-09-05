<template>
  <div>
    <div class="btn-group">
      <span>
        <el-button type="primary" @click="reload"><i class="fa fa-refresh"></i></el-button>
        <el-button type="primary" @click="openLog" :disabled="!currentRow"><i class="fa fa-file-text" aria-hidden="true"></i> 日志</el-button>
      </span>
      <el-button-group style="display: flex">
        <el-input class="el-input-search" icon="search" v-model="searchWord" placeholder="请输入内容"></el-input>
      </el-button-group>
    </div>

    <log-dialog @ok="openOk" ref="logDialog"></log-dialog>

    <el-table
      ref="multipleTable"
      :data="filterCicd"
      border
      v-loading="listLoading"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleCurrentChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="buildNum"
        label="构建ID"
        sortable>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="branch"
        label="分支">
      </el-table-column>
      <el-table-column
        prop="tag"
        label="Tag">
      </el-table-column>
      <el-table-column
        prop="buildDate"
        label="时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="imageAddress"
        label="镜像地址"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import * as type from '@/store/cicd/mutations_types'
  import LogDialog from '@/views/cicd/modals/LogDialog'

  export default {
    data () {
      return {
        jobName: this.$route.params.name,
        listLoading: false,
        multipleSelection: [],
        currentRows: [],
        searchWord: ''
      }
    },
    computed: {
      ...mapState({
        cicd ({cicd}) {
          return cicd.cicd
        },
        filterCicd: function () {
          return this.searchWord ? this.cicd.filter(item => item.status.toLowerCase().includes(this.searchWord)) : this.cicd
        },
        currentRow: function () {
          return this.currentRows.length === 1 ? this.currentRows[0] : null
        }
      })
    },
    components: {
      LogDialog
    },
    methods: {
      openOk () {
        console.log('打开弹框')
      },
      handleCurrentChange (val) {
        this.currentRows = val
      },
      openLog () {
        this.$refs.logDialog.open(this.jobName, this.currentRow.buildNum)
      },
      reload () {
        this.listLoading = true
        this.$store.dispatch(type.FETCH_CICD, this.$route.params.name)
          .then(() => (this.listLoading = false))
          .catch(() => (this.listLoading = false))
      }
    }
  }
</script>
<style scoped>

</style>
