<template>
  <div>
    <div class="btn-group">
      <span>
        <el-button type="primary"><i class="glyphicon glyphicon-repeat"></i></el-button>
        <el-button type="primary" :disabled="!currentRow"><i class="ion-ios-plus-outline"></i> 部署</el-button>
        <el-button type="danger" :disabled="!currentRow"><i class="ion-ios-minus-outline"></i> 删除</el-button>
        <el-button type="primary" @click="openCreate"><i class="ion-ios-plus-outline"></i> 新增项目</el-button>
      </span>
      <el-button-group style="display: flex">
        <el-input class="el-input-search" icon="search" v-model="searchWord" placeholder="请输入内容"></el-input>
      </el-button-group>
    </div>

    <create-dialog @ok="createOk" ref="createDialog"></create-dialog>

    <el-table
      ref="multipleTable"
      :data="filterCicds"
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
        label="项目">
        <template scope="item">
          <router-link :title="item.row.name" class="ellipsis" :to="{name: '构建详情', params:{name : item.row.name}}">
            {{ item.row.name }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="imageName"
        label="镜像名称">
      </el-table-column>
      <el-table-column
        prop="leatestVesion"
        label="最新版本">
      </el-table-column>
      <el-table-column
        prop="leatestBuilderDate"
        label="最新构建格式"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import {mapState, mapActions} from 'vuex'
  import CreateDialog from '@/views/cicd/modals/CreateDialog'
  import * as type from '@/store/cicd/mutations_types'

  export default {
    components: {
      CreateDialog
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
      createOk () {
      },
      handleCurrentChange (val) {
        this.currentRows = val
      },
      openCreate () {
        this.$refs.createDialog.open()
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
<style scoped>
  .btn-group {
    justify-content: space-between;
  }
</style>
