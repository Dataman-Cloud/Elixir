<template>
  <div>
    <div class="btn-group">
      <span>
        <el-button type="primary" @click="reload">
          <span class="glyphicon glyphicon-repeat" aria-hidden="true"></span>
        </el-button>
        <el-button type="primary" @click="openCreate">
          <i class="ion-ios-plus-outline"></i> 创建编排
        </el-button>
        <el-button type="danger" @click="deleteCompose" :disabled="!currentRow">
          <i class="ion-ios-minus-outline"></i> 删除编排</el-button>
      </span>

      <el-button-group style="display: flex">
        <el-input class="el-input-search" icon="search" v-model="searchWord" placeholder="请输入编排名称"></el-input>
      </el-button-group>
    </div>

    <create-compose ref="createCompose"></create-compose>

    <el-table :data="filterComposes" border style="width: 100%" row-key="id" v-loading="listLoading" @selection-change="handleCurrentChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="名称" width="180">
        <template scope="scope">
          <router-link :title="scope.row.id" class="ellipsis" :to="{name: '编排详情', params:{id : scope.row.id}}">{{scope.row.name}}</router-link>
        </template>
      </el-table-column>
      <el-table-column property="desc" label="介绍"></el-table-column>
      <el-table-column prop="op_status" label="状态"></el-table-column>
      <el-table-column property="created_at" label="创建时间">
        <template scope="scope">
          <span>{{scope.row.created_at | formatTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </template>
      </el-table-column>
      <el-table-column property="updated_at" label="更新时间" min-width="80">
        <template scope="scope">
          <span>{{scope.row.updated_at | formatTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Confirm from '@/utils/confirm'
import CreateCompose from '@/views/compose/modals/CreateCompose'
import * as compose from '@/api/compose'
import * as type from '@/store/compose/mutations_types'

export default {
  components: {
    CreateCompose
  },
  data () {
    return {
      listLoading: false,
      currentRows: [],
      searchWord: ''
    }
  },
  computed: {
    ...mapState({
      composes (state) {
        return state.compose.composes.composes
      }
    }),
    currentRow: function () {
      return this.currentRows.length === 1 ? this.currentRows[0] : null
    },
    filterComposes: function () {
      return this.searchWord ? this.composes.filter(compose => compose.id.toLowerCase().includes(this.searchWord)) : this.composes
    }
  },
  methods: {
    ...mapActions({
      fetchComposes: type.FETCH_COMPOSES
    }),
    async deleteCompose () {
      await Confirm.open(`确认删除编排及其应用?`)
      await compose.deleteCompose(this.currentRow.id)
      this.$notify({ message: '删除成功' })
      this.fetchComposes()
    },
    handleCurrentChange (val) {
      this.currentRows = val
    },
    async listCompose () {
      this.listLoading = true
      await this.fetchComposes().catch(() => {})
      // await catch is a hack func to call this expression
      this.listLoading = false
    },
    openCreate () {
      this.$refs.createCompose.open()
    },
    reload () {
      this.listCompose()
    }
  },
  mounted () {
    this.listCompose()
  }
}
</script>
<style scoped>
.btn-group {
  justify-content: space-between;
}
</style>

