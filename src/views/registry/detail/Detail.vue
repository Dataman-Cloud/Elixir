<template>
  <div>
    <div>
      {{$route.params.name}}
    </div>
    <div class="btn-group">
      <span>
        <el-button type="primary">
          <i class="glyphicon glyphicon-repeat"></i>
        </el-button>
        <el-button type="danger" @click="openDelete" :disabled="!currentRow">
          <i class="ion-ios-minus-outline"></i> 删除镜像</el-button>
      </span>
      <el-button-group style="display: flex">
        <el-input class="el-input-search" icon="search" v-model="searchWord" placeholder="请输入内容"></el-input>
      </el-button-group>
    </div>
    <el-table :data="filterTags" highlight-current-row border v-loading="listLoading" @selection-change="handleCurrentChange" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column sortable show-overflow-tooltip width="200" property="projectName" label="项目名称">
      </el-table-column>
      <el-table-column property="imageName" sortable label="镜像名称">
      </el-table-column>
      <el-table-column property="tag" sortable label="标签">
      </el-table-column>
      <el-table-column property="created" sortable label="时间戳(build 镜像)">
        <template scope="scope">
          <span>{{scope.row.created | formatTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import * as type from '@/store/registry/mutations_types'
import { mapState, mapActions } from 'vuex'
import Confirm from '@/utils/confirm'
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
      tags (state) {
        return state.registry.tags.tags
      },
      projectid ({user}) {
        return user.projectid
      },
      filterTags: function () {
        return this.searchWord ? this.tags.filter(tag => tag.imageName.toLowerCase().includes(this.searchWord)) : this.tags
      },
      currentRow: function () {
        return this.currentRows.length === 1 ? this.currentRows[0] : null
      }
    })
  },
  methods: {
    ...mapActions({
      fetchTags: type.FETCH_TAGDETAIL
    }),
    handleCurrentChange (val) {
      this.currentRows = val
    },
    async openDelete () {
      if (this.currentRow) {
        await Confirm.open(`确认删除 ${this.currentRow.imageName} 镜像仓库?`)
        let res = await registryApi.deleteTags(this.$route.params.name, this.currentRow.tag)
        if (res.code === '01') {
          this.$notify({ message: res.message })
        } else {
          this.$notify({ message: '删除成功' })
          this.fetchTags(this.$route.params.name)
        }
      } else {
        this.$notify({ message: '尚未选中镜像' })
      }
    }
  },
  created () {
    this.listLoading = true
    this.fetchTags(this.$route.params.name)
      .then(() => {
        this.listLoading = false
      })
  },
  watch: {
    $route (to) {
      this.$store.dispatch(type.FETCH_TAGDETAIL, this.$route.params.name)
    }
  }
}
</script>
<style scoped>
.btn-group {
  justify-content: space-between;
}
</style>
