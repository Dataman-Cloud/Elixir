<template>
  <div>
    <el-card :body-style="{ padding: '0px 10px 0 0' }">
      <div style="padding: 14px;">
        <span class="cluster-title">{{cluster.clusterLabel}}</span>
        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <dl class="detail-config">
                <dt>用户组</dt>
                <dd>
                  <small>{{cluster.groupName}}</small>
                </dd>
              </dl>
              <dl class="detail-config">
                <dt>创建时间</dt>
                <dd>
                  <small>{{cluster.createAt}}</small>
                </dd>
              </dl>
              <dl class="detail-config">
                <dt>创建者</dt>
                <dd>
                  <small>{{cluster.accountName}}</small>
                </dd>
              </dl>
            </div>
          </el-col>
          <el-col :span="12">
            <el-row :gutter="20" type="flex" class="row-bg" justify="end">
              <div class="btn-group">
                <span>
                  <el-button type="danger" @click="openDelete(cluster)">
                    <i class="ion-ios-plus-outline"></i> 删除集群
                  </el-button>
                  <el-button type="primary" @click="addHost(cluster.clusterLabel)">
                    <i class="ion-ios-plus-outline"></i> 添加主机
                  </el-button>
                </span>
              </div>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <delete-cluster-dialog ref="deleteDialog"></delete-cluster-dialog>
    <add-host-dialog ref="addHost" @close="addHostClose" :hostList="hostList"></add-host-dialog>

    <el-card v-loading="listLoading" :body-style="{ padding: '0px 10px 20px', marginTop: '20px' }" class="cluster-detail">
      <div class="btn-group">
        <el-button type="primary" @click="reload">
          <span class="glyphicon glyphicon-repeat" aria-hidden="true"></span>
        </el-button>
      </div>
      <el-table stripe :data="cluster.slaves" border tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="hostname" label="主机" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template scope="scope">
            <el-button size="small" @click="delHost(scope.row.hostname)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import DeleteClusterDialog from '@/views/cluster/modals/DeleteDialog'
import AddHostDialog from '@/components/addHostDialog'
import { mapActions, mapState } from 'vuex'
import * as type from '@/store/cluster/mutations_types'
import * as hostType from '@/store/host/mutations_types'
import * as cluster from '@/api/cluster'
import Confirm from '@/utils/confirm'
import * as host from '@/api/host'
export default {
  components: {
    DeleteClusterDialog,
    AddHostDialog
  },
  data () {
    return {
      cluster: {},
      listLoading: false,
      checkedHost: []
    }
  },
  computed: {
    ...mapState({
      hostList (state) {
        return state.host.clusterHosts.clusterHosts
      }
    })
  },
  methods: {
    ...mapActions({
      fetchCluster: type.FETCH_CLUSTER,
      listHosts: hostType.FETCH_CLUSTER_HOSTS
    }),
    async addHost () {
      await this.listHosts()
      this.$refs.addHost.open()
    },
    async addHostClose (checkedHost) {
      this.checkedHost = checkedHost
      const checkedIps = this.transformHosts(this.hostList)
      await host.addHost(this.cluster.clusterLabel, checkedIps)
      this.$notify({ message: '添加成功' })
      await this.getCluster()
    },
    async delHost (ip) {
      await Confirm.open(`确认删除该主机?`)
      await host.delHost(this.cluster.clusterLabel, ip)
      this.$notify({ message: '删除成功' })
      await this.getCluster()
    },
    async getCluster () {
      this.listLoading = true
      try {
        let data = await this.fetchCluster(this.$route.params.name)
        this.cluster = data
      } finally {
        this.listLoading = false
      }
    },
    async openDelete (clusterLabel) {
      if (clusterLabel.machineNum || clusterLabel.appNum) {
        this.$refs.deleteDialog.open(clusterLabel)
      } else {
        await Confirm.open(`确认移除该集群?`)
        await cluster.delCluster(clusterLabel.clusterLabel)
        this.$router.push({ name: '集群' })
      }
    },
    reload () {
      this.getCluster()
    },
    transformHosts (hosts = []) {
      return hosts.map((item, i) => {
        if (this.checkedHost.indexOf(i) !== -1) {
          return item.label
        }
      })
    }
  },
  created () {
    this.getCluster()
  },
  watch: {
    $route (to, from) {
      this.getCluster()
    }
  }
}
</script>
<style scoped>
.cluster-title {
  font-size: 20px;
}

.detail-config>dd {
  padding-left: 50px;
}
</style>
