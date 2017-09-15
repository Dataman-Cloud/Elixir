<template>
  <div>
    <div class="btn-group">
      <span>
        <el-button type="primary" @click="reload"><i class="glyphicon glyphicon-repeat"></i></el-button>
        <el-button type="danger" @click="openDelete" :disabled="!currentRow"><i class="ion-ios-minus-outline"></i> 删除仓库</el-button>
        <router-link class="primary" to="/registry/histories" tag="el-button"><i class="fa fa-history"></i> 历史</router-link>
      </span>
      <el-button-group style="display: flex">
        <el-input class="el-input-search" icon="search" v-model="searchWord" placeholder="请输入内容"></el-input>
      </el-button-group>
    </div>

    <el-table
      :data="filterRegistries"
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
        auth: 'dataman'
      }
    },
    computed: {
      ...mapState({
        registries (state) {
          return state.registry.registries.registries
        },
        projectid ({user}) {
          return user.projectid
        }
      }),
      filterRegistries: function () {
        return this.searchWord ? this.registries.filter(reistry => reistry.name.toLowerCase().includes(this.searchWord)) : this.registries
      },
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
      async openDelete () {
        if (this.currentRow) {
          await Confirm.open(`确认删除 ${this.currentRow.name} 镜像?`)
          let res = await registryApi.deleteHarbor(this.currentRow.name)
          if (res.code === '01') {
            this.$notify({ message: res.message })
          } else {
            this.$notify({ message: '删除成功' })
            this.fetchRegistries()
          }
        } else {
          this.$notify({message: '尚未选中镜像'})
        }
      },
      reload () {
        this.listLoading = true
        this.fetchRegistries()
          .then(() => (this.listLoading = false))
          .catch(() => (this.listLoading = false))
      }
    },
    created () {
      this.listLoading = true
      this.fetchRegistries()
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
