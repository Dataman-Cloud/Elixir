<template>
  <div>
    <div class="btn-group">
      <span>
        <el-button type="primary" @click="reload"><i class="glyphicon glyphicon-repeat"></i></el-button>
        <el-button type="danger" @click="openDelete" :disabled="!currentRow"><i class="ion-ios-minus-outline"></i> 删除仓库</el-button>
        <router-link class="primary" to="/registry/histories" tag="el-button"><i class="fa fa-history"></i> 历史</router-link>
      </span>
      <el-button-group style="display: flex">
        <el-input class="el-input-search" icon="search" v-model="searchWord" placeholder="请输入内容" @change="reload"></el-input>
      </el-button-group>
    </div>

    <el-table
      :data="registries"
      highlight-current-row
      border
      row-key="ID"
      v-loading="listLoading"
      @selection-change="handleCurrentChange"
      style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        sortable show-overflow-tooltip
        property="name"
        label="名称">
        <template scope="harbor">
          <router-link :title="harbor.row.name" class="ellipsis" :to="{name: '镜像仓库', params:{name : harbor.row.name}}">{{harbor.row.name}}</router-link>
        </template>
      </el-table-column>
      <el-table-column
        property="tags_count"
        sortable label="标签数">
      </el-table-column>
      <el-table-column
        property="pull_count"
        sortable label="下载数">
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
  import Confirm from '@/utils/confirm'
  import * as type from '@/store/registry/mutations_types'
  import * as registryApi from '@/api/registry'

  export default {
    data () {
      return {
        listLoading: false,
        currentRows: [],
        searchWord: '',
        auth: 'dataman',
        pageSize: 15,
        page: 1
      }
    },
    computed: {
      ...mapState({
        registries (state) {
          return state.registry.registries.registries.data
        },
        total (state) {
          return state.registry.registries.registries.totalCount
        },
        currentPage (state) {
          return state.registry.registries.registries.pageNum
        },
        projectid ({user}) {
          return user.projectid
        }
      }),
      currentRow: function () {
        return this.currentRows.length === 1 ? this.currentRows[0] : null
      }
    },
    methods: {
      ...mapActions({
        fetchRegistries: type.FETCH_REGISTRIES
      }),
      handleCurrentChange (val) {
        this.currentRows = val
      },
      handlePageChange (val) {
        this.page = val
        this.reload()
      },
      async openDelete () {
        if (this.currentRow) {
          await Confirm.open(`确认删除 ${this.currentRow.name} 镜像?`)
          let res = await registryApi.deleteHarbor(this.projectid, this.currentRow.name)
          if (res.code === '01') {
            this.$notify({ message: res.message })
          } else {
            this.$notify({ message: '删除成功' })
            this.fetchTags(this.$route.params.name)
          }
        } else {
          this.$notify({message: '尚未选中镜像'})
        }
      },
      reload () {
        this.listLoading = true
        this.fetchRegistries({page: this.page, search: this.searchWord})
          .then(() => (this.listLoading = false))
          .catch(() => (this.listLoading = false))
      }
    },
    created () {
      this.listLoading = true
      this.fetchRegistries({page: 1, search: ''})
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
