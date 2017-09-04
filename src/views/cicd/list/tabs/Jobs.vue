<template>
  <div>
    <div class="btn-group">
      <span>
        <el-button type="primary" @click="reload">
          <i class="glyphicon glyphicon-repeat"></i>
        </el-button>
        <el-button type="primary" @click="openCreate">
          <i class="ion-ios-plus-outline"></i> 新增项目</el-button>
        <el-button type="primary" :disabled="!currentRow" @click="openBuild">
          <i class="ion-ios-plus-outline"></i> 立即构建</el-button>
        <el-button type="danger" :disabled="!currentRow" @click="deleteCicd">
          <i class="ion-ios-minus-outline"></i> 删除</el-button>
      </span>
      <el-button-group style="display: flex">
        <el-input class="el-input-search" icon="search" v-model="searchWord" placeholder="请输入内容"></el-input>
      </el-button-group>
    </div>

    <create-dialog ref="createDialog"></create-dialog>
    <build-dialog ref="buildDialog"></build-dialog>
    <manage-dialog ref="manageDialog"></manage-dialog>
    <el-table ref="multipleTable" :data="filterCicds" border v-loading="listLoading" tooltip-effect="dark" style="width: 100%" @selection-change="handleCurrentChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="项目">
        <template scope="item">
          <router-link :title="item.row.name" class="ellipsis" :to="{name: '构建详情', params:{name : item.row.name}}">
            {{ item.row.name }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
      </el-table-column>
      <el-table-column prop="imageName" label="镜像名称">
      </el-table-column>
      <el-table-column prop="leatestVesion" label="最新版本">
      </el-table-column>
      <el-table-column label="最新构建时间" show-overflow-tooltip>
        <template scope="cicd">
          <span v-if="cicd.row.status === '构建成功'">{{cicd.row.leatestBuilderDate}}</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import CreateDialog from '@/views/cicd/modals/CreateDialog'
import BuildDialog from '@/views/cicd/modals/BuildDialog'
import ManageDialog from '@/views/cicd/modals/ManageDialog'
import * as type from '@/store/cicd/mutations_types'
import * as fetchCicd from '@/api/cicd'
import Confirm from '@/utils/confirm'

export default {
  components: {
    CreateDialog,
    BuildDialog,
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
      cicds (state) {
        return state.cicd.cicds.cicds
      },
      filterCicds: function () {
        return this.searchWord ? this.cicds.filter(cicd => cicd.name.toLowerCase().includes(this.searchWord)) : this.cicds
      },
      currentRow: function () {
        return this.currentRows.length === 1 ? this.currentRows[0] : null
      }
    })
  },
  methods: {
    ...mapActions({
      fetchCicds: type.FETCH_CICDS
    }),
    openBuild () {
      this.$refs.buildDialog.open(this.currentRow)
    },
    openManage () {
      this.$refs.manageDialog.open()
    },
    async deleteCicd () {
      await Confirm.open(`确认删除该信息?`)
      await fetchCicd.cicdDelete(this.currentRows.map(item => item.name))
      this.$notify({ message: '删除成功' })
      this.fetchCicds()
    },
    handleCurrentChange (val) {
      this.currentRows = val
    },
    openCreate () {
      this.$refs.createDialog.open()
    },
    reload () {
      this.listLoading = true
      this.fetchCicds()
        .then(() => (this.listLoading = false))
        .catch(() => (this.listLoading = false))
    }
  },
  created () {
    this.listLoading = true
    this.fetchCicds()
      .then(() => {
        this.listLoading = false
      })
  }
}
</script>

