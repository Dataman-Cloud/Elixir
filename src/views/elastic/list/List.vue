<template>
  <div>
    <div class="btn-group">
      <span>
        <el-button type="primary" @click="reload"><i class="glyphicon glyphicon-repeat"></i></el-button>
        <el-button type="danger" @click="openDelete" :disabled="!currentRow"><i class="ion-ios-minus-outline"></i> 删除</el-button>
        <el-button type="primary" :disabled="!currentRow" @click="openUpdate"><i class="ion-ios-plus-outline"></i> 编辑</el-button>
        <el-button type="primary" @click="openCreate"><i class="ion-ios-plus-outline"></i> 新建策略</el-button>
      </span>
      <el-button-group style="display: flex">
        <el-input class="el-input-search" icon="search" v-model="searchWord" placeholder="请输入内容"></el-input>
      </el-button-group>
    </div>

    <create-dialog @ok="createOk" ref="createDialog"></create-dialog>

    <el-table
      ref="multipleTable"
      :data="filterPolicies"
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
        label="应用名称">
        <template scope="scope">
          <!--{{ scope.row.app_id }}-->
          <router-link :title="scope.row.app_id" class="ellipsis" :to="{name: '扩缩历史', params:{name : scope.row.app_id}}">
            {{scope.row.app_id}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
          label="告警规则">
        <template scope="scope">
          <span>{{scope.row.type}} {{scope.row.operator}} {{scope.row.set_value}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="monitor_cycle"
        label="监控周期(秒)">
      </el-table-column>
      <el-table-column
        prop="threshold"
        label="阈值">
      </el-table-column>
      <el-table-column
        prop="action"
        label="扩缩方式">
        <template scope="scope">
          <span v-if="scope.row.action === 1">扩</span>
          <span v-if="scope.row.action === 2">缩</span>
        </template>
      </el-table-column>
      <el-table-column
        label="目标实例数">
        <template scope="scope">
          <span v-if="scope.row.action === 1">{{scope.row.max_instance}}</span>
          <span v-if="scope.row.action === 2">{{scope.row.min_instance}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="step"
        label="步长">
      </el-table-column>
      <el-table-column
        label="状态">
        <template scope="scope">
          <span v-if="scope.row.status === 'start'">开启</span>
          <span v-if="scope.row.status === 'disable'">关闭</span>
        </template>
      </el-table-column>
      <el-table-column
        label="更新时间">
        <template scope="scope">
          <span :title="scope.row.updated" class="ellipsis">{{scope.row.updated}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import {mapState, mapActions} from 'vuex'
  import * as type from '@/store/elastic/mutations_types'
  import CreateDialog from '@/views/elastic/modals/CreateDialog'
  import Confirm from '@/utils/confirm'
  import * as fetchElastic from '@/api/elastic'

  export default {
    components: {
      CreateDialog
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
        policies (state) {
          return state.elastic.policies.policies
        },
        filterPolicies: function () {
          return this.searchWord ? this.policies.filter(policy => policy.app_id.toLowerCase().includes(this.searchWord)) : this.policies
        },
        currentRow: function () {
          return this.currentRows.length === 1 ? this.currentRows[0] : null
        }
      })
    },
    methods: {
      ...mapActions({
        fetchElastic: type.FETCH_POLICY
      }),
      createOk () {},
      handleCurrentChange (val) {
        this.currentRows = val
      },
      openCreate () {
        this.$refs.createDialog.open()
      },
      async openDelete () {
        await Confirm.open(`确认删除策略?`)
        await fetchElastic.deletePolicy(this.currentRows.map(policy => policy.id))
        this.$notify({message: '删除成功'})
        this.fetchElastic()
      },
      openUpdate () {
        this.$refs.createDialog.open(this.currentRow.id)
      },
      reload () {
        this.listLoading = true
        this.fetchElastic()
          .then(() => (this.listLoading = false))
      }
    },
    created () {
      this.listLoading = true
      this.fetchElastic()
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
