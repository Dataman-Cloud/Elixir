<template>
  <div>
    <div class="btn-group">
      <span>
        <el-button type="primary" @click="reload">
          <i class="glyphicon glyphicon-repeat"></i>
        </el-button>
        <el-button type="primary" @click="openManage">
          <i class="ion-ios-plus-outline"></i> 仓库认证管理</el-button>
        <el-button type="danger" :disabled="!currentRow" @click="deleteManage">
          <i class="ion-ios-minus-outline"></i> 删除仓库认证</el-button>
      </span>
      <el-button-group style="display: flex">
        <el-input class="el-input-search" icon="search" v-model="searchWord" placeholder="请输入内容"></el-input>
      </el-button-group>
    </div>

    <manage-dialog ref="manageDialog"></manage-dialog>
    <el-table ref="multipleTable" :data="filterJenkins" border v-loading="listLoading" tooltip-effect="dark" style="width: 100%" @selection-change="handleCurrentChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="displayName" label="名称">
      </el-table-column>
      <el-table-column prop="id" label="id">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import ManageDialog from '@/views/cicd/modals/ManageDialog'
import * as type from '@/store/cicd/mutations_types'
import * as fetchCicd from '@/api/cicd'
import Confirm from '@/utils/confirm'

export default {
  components: {
    ManageDialog
  },
  data () {
    return {
      listLoading: false,
      multipleSelection: [],
      currentRows: [],
      searchWord: ''
    }
  },
  computed: {
    ...mapState({
      jenkins (state) {
        return state.cicd.jenkins.jenkins
      },
      filterJenkins: function () {
        return this.searchWord ? this.jenkins.filter(jenkin => jenkin.displayName.toLowerCase().includes(this.searchWord)) : this.jenkins
      },
      currentRow: function () {
        return this.currentRows.length === 1 ? this.currentRows[0] : null
      }
    })
  },
  methods: {
    ...mapActions({
      fetchJenkins: type.FETCH_LISTJENKINS
    }),
    openManage () {
      this.$refs.manageDialog.open()
    },
    async deleteManage () {
      await Confirm.open(`确认删除仓库认证?`)
      await fetchCicd.manageDel(this.currentRows.map(item => item.id))
      this.$notify({ message: '删除成功' })
      this.submitLoading = true
      this.fetchJenkins()
    },
    handleCurrentChange (val) {
      this.currentRows = val
    },
    reload () {
      this.listLoading = true
      this.fetchJenkins()
        .then(() => (this.listLoading = false))
        .catch(() => (this.listLoading = false))
    }
  },
  created () {
    this.listLoading = true
    this.fetchJenkins()
      .then(() => {
        this.listLoading = false
      })
  }
}
</script>
<style scoped>

</style>
