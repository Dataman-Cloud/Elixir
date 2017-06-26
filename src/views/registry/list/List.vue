<template>
  <div>
    <div class="btn-group">
      <span>
        <el-button type="primary" @click="reload"><i class="fa fa-refresh"></i></el-button>
        <el-button type="danger" @click="openDelete" :disabled="!currentRow"><i class="fa fa-minus-circle"></i> 删除镜像</el-button>
        <router-link class="primary" to="/registry/histories" tag="el-button"><i class="el-icon-more"></i> 历史</router-link>
      </span>
      <el-button-group style="display: flex">
        <el-input class="el-input-search" icon="search" v-model="searchWord" placeholder="请输入内容"></el-input>
      </el-button-group>
    </div>

    <el-table
      :data="filterRegistries"
      highlight-current-row
      stripe
      border
      row-key="ID"
      v-loading="listLoading"
      @selection-change="handleCurrentChange"
      style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        sortable show-overflow-tooltip
        width="200"
        property="Image"
        label="名称">
      </el-table-column>
      <el-table-column
        property="ImageUrl"
        sortable label="地址">
      </el-table-column>
      <el-table-column
        property="LatestTag"
        sortable label="最新版本">
      </el-table-column>
      <el-table-column
        property="CreatedAt"
        sortable label="创建时间">
        <template scope="scope">
          <span>{{scope.row.CreatedAt | formatTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </template>
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
        searchWord: ''
      }
    },
    computed: {
      ...mapState({
        registries (state) {
          return state.registry.registries.registries
        }
      }),
      filterRegistries: function () {
        return this.searchWord ? this.registries.filter(reistry => reistry.Image.toLowerCase().includes(this.searchWord)) : this.registries
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
      openDelete () {
        if (this.currentRow) {
          Confirm.open(`确认删除 ${this.currentRow.Image} 镜像?`)
            .then(() => {
              registryApi.deleteRegistry(this.currentRow)
                .then(() => {
                  this.$notify({message: '删除成功'})
                  this.fetchRegistries()
                })
            })
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
