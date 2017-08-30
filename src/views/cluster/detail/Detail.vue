<template>
  <div>

    <el-card v-loading="listLoading" :body-style="{ padding: '0px 10px 0 0' }">
      <div style="padding: 14px;">
        <span>{{cluster.clusterLabel}}</span>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="bottom clearfix">
                  <time class="time">用户组</time>
                  <span class="clusterDetail">{{cluster.groupNam}}</span>
                </div>
                <div class="bottom clearfix">
                  <time class="time">创建时间</time>
                  <span class="clusterDetail">{{cluster.createAt}}</span>
                </div>
                <div class="bottom clearfix">
                  <time class="time">创建者</time>
                  <span class="clusterDetail">{{cluster.accountName}}</span>
                </div>

              </el-col>
              <el-col :span="5" class="cluster-right">

              </el-col>
              <el-col :span="5" class="cluster-right">

              </el-col>
            </el-row>

          </el-col>
          <el-col :span="12">
            <el-row :gutter="20" type="flex" class="row-bg" justify="end">
              <div class="btn-group">
                <span>
                  <el-button type="danger" @click="openDelete">
                    <i class="ion-ios-plus-outline"></i> 删除集群
                  </el-button>
                  <el-button type="primary" @click="addHost">
                    <i class="ion-ios-plus-outline"></i> 添加主机
                  </el-button>
                </span>
              </div>

            </el-row>
          </el-col>

        </el-row>
      </div>
    </el-card>
    <delete-dialog ref="deleteDialog"></delete-dialog>
    <add-dialog ref="addHost"></add-dialog>

    <el-card v-loading="listLoading" :body-style="{ padding: '0px 10px', marginTop: '20px' }" class="cluster-detail">
      <div class="btn-group">
        <el-button type="danger" @click="openDelete" :disabled="!currentRow">
          <i class="ion-ios-plus-outline"></i> 删除
        </el-button>
      </div>

      <el-table stripe ref="multipleTable" :data="tableData3" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="日期" width="120">
          <template scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import DeleteDialog from '@/views/cluster/modals/DeleteDialog'
import AddDialog from '@/views/cluster/modals/AddDialog'
import { mapActions } from 'vuex'
import * as type from '@/store/cluster/mutations_types'
export default {
  components: {
    DeleteDialog,
    AddDialog
  },
  data () {
    return {
      tableData3: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      multipleSelection: '',
      currentRows: [],
      listLoading: false,
      cluster: {}
    }
  },
  computed: {
    currentRow: function () {
      return this.currentRows.length === 1 ? this.currentRows[0] : null
    }
  },
  methods: {
    ...mapActions({
      fetchCluster: type.FETCH_CLUSTER
    }),
    openDelete () {
      this.$refs.deleteDialog.open()
    },
    addHost () {
      this.$refs.addHost.open()
    },
    handleSelectionChange (val) {
      this.currentRows = val
    }
  },
  created () {
    this.listLoading = true
    this.fetchCluster(this.$route.params.name)
      .then((res) => {
        this.cluster = res
        this.listLoading = false
      })
  },
  watch: {
    $route (to) {
      this.$store.dispatch(type.FETCH_CLUSTER, this.$route.params.name)
    }
  }
}
</script>
<style scoped>
.bottom {
  margin: 13px 0;
  line-height: 12px;
}

.clusterDetail {
  padding: 0;
  float: right;
}

.cluster-detail {
  margin-top: 20px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
