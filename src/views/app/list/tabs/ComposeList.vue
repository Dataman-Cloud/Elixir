<template>
  <div>
    <div class="btn-group">
      <span>
        <el-button type="primary">
          <span class="glyphicon glyphicon-repeat" aria-hidden="true"></span>
        </el-button>
        <el-button type="primary" @click="openCreate">
          <i class="ion-ios-plus-outline"></i> 创建编排
        </el-button>
        <el-button type="danger" :disabled="!currentRow">
          <i class="ion-ios-minus-outline"></i> 删除编排
        </el-button>
      </span>

      <!-- <el-button-group style="display: flex">
        <el-input class="el-input-search" icon="search" placeholder="请输入编排名称"></el-input>
      </el-button-group> -->

    </div>
    <create-compose @ok="createOk" ref="createCompose"></create-compose>

    <el-table ref="multipleTable" :data="composes" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column property="display_name" label="编排名称">
        <template scope="compose">
          <span>
            {{compose.row.display_name.replace(/\./g,'-')}}
          </span>
        </template>
      </el-table-column>
      <el-table-column property="status" label="状态"></el-table-column>
      <el-table-column property="desc" label="介绍"></el-table-column>
      <el-table-column property="created_at" label="创建时间">
        <template scope="scope">
          <span>{{scope.row.created_at | formatTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </template>
      </el-table-column>
      <el-table-column property="updated_at" label="更新时间">
        <template scope="scope">
          <span>{{scope.row.updated_at | formatTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import * as type from '@/store/app/mutations_types'
import CreateCompose from '@/views/app/modals/CreateCompose'

export default {
  components: {
    CreateCompose
  },
  data () {
    return {
      listLoading: false,
      currentRows: []
    }
  },
  computed: {
    ...mapState({
      composes (state) {
        return state.app.composes.composes
      },
      currentRow: function () {
        return this.currentRows.length === 1 ? this.currentRows[0] : null
      }
    })
  },
  methods: {
    ...mapActions({
      fetchComposes: type.FETCH_COMPOSES
    }),
    createOk () {
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.currentRows = val
    },
    listComposes () {
      return this.fetchComposes().then(() => {
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    openCreate () {
      this.$refs.createCompose.open()
    }
  },
  mounted () {
    this.listLoading = true
    this.listComposes()
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
