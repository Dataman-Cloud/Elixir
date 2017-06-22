<template>
  <div>
    <div class="btn-group">
      <el-button-group>
        <el-button type="primary" @click="openDelete"><i class="el-icon-close"></i> 删除镜像</el-button>
        <router-link class="pan-btn pink-btn" to="/registry/histories">
          <el-button type="primary">查看历史</el-button>
        </router-link>
      </el-button-group>
      <el-button-group style="display: flex">
        <el-input v-model="searchWord" placeholder="请输入内容"></el-input>
        <el-button type="primary" @click="reload"><i class="fa fa-refresh"></i></el-button>
      </el-button-group>
    </div>

    <el-table
      :data="filterRegistries"
      highlight-current-row
      stripe
      row-key="ID"
      v-loading="listLoading"
      @current-change="handleCurrentChange"
      style="width: 100%">
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
        currentRow: null,
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
      }
    },
    methods: {
      ...mapActions({
        fetchRegistries: type.FETCH_REGISTRIES
      }),
      handleCurrentChange (val) {
        this.currentRow = val
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
