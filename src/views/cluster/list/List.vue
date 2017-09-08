<template>
  <div>
    <div class="btn-group">
      <span>
        <el-button type="primary" @click="reload">
          <span class="glyphicon glyphicon-repeat" aria-hidden="true"></span>
        </el-button>
        <el-button type="primary" @click="openCreate">
          <i class="ion-ios-plus-outline"></i> 创建集群
        </el-button>
      </span>
      <el-button-group style="display: flex">
        <el-input class="el-input-search" icon="search" placeholder="请输入集群名称" v-model="searchCluster"></el-input>
      </el-button-group>
    </div>
    <create-dialog ref="createDialog"></create-dialog>
    <el-row v-loading="listLoading">
      <el-col class="cluster-card" :span="8" v-for="(cluster, index) in filterClusters" :key="index">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
            <router-link class="ellipsis cluster-title" :to="{name: '集群详情',params:{name : cluster.clusterLabel}}">
              {{cluster.clusterLabel}}
            </router-link>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-row :gutter="20">
                  <el-col :span="10">
                    <div class="bottom clearfix">
                      <span class="time">用户组</span>
                      <span class="clusterDetail">{{cluster.groupNam}}</span>
                    </div>
                    <div class="bottom clearfix">
                      <time class="time">创建时间</time>
                      <span class="clusterDetail">{{cluster.createAt}}</span>
                    </div>
                    <div class="bottom clearfix">
                      <span class="time">创建者</span>
                      <span class="clusterDetail">{{cluster.accountName}}</span>
                    </div>
                  </el-col>
                  <el-col :span="5" class="cluster-app">
                    <el-row :gutter="20">主机</el-row>
                    <el-row :gutter="20" class="cluster-host">{{cluster.machineNum}}</el-row>
                  </el-col>
                  <el-col :span="5" class="cluster-app">
                    <el-row :gutter="20">应用</el-row>
                    <el-row :gutter="20">
                      <span class="cluster-host"> {{cluster.appNum}}</span>
                    </el-row>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row :gutter="20">
                  <el-col :span="8">
                    图一
                  </el-col>
                  <el-col :span="8">
                    图二
                  </el-col>
                  <el-col :span="8">
                    图三
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-button-group>
              <el-button type="danger" icon="delete" @click="openDelete(cluster)"></el-button>
              <el-button type="primary" @click="addHost(cluster.clusterLabel)" icon="plus"></el-button>
            </el-button-group>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <delete-cluster-dialog ref="deleteDialog"></delete-cluster-dialog>
    <Add-Dialog ref="addHost"></Add-Dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import * as cluster from '@/api/cluster'
import Confirm from '@/utils/confirm'
import * as type from '@/store/cluster/mutations_types'
import CreateDialog from '@/views/cluster/modals/CreateDialog'
import DeleteClusterDialog from '@/views/cluster/modals/DeleteDialog'
import AddDialog from '@/views/cluster/modals/AddDialog'
export default {
  components: {
    CreateDialog,
    DeleteClusterDialog,
    AddDialog
  },
  data () {
    return {
      listLoading: false,
      searchCluster: ''
    }
  },
  computed: {
    ...mapState({
      clusters (state) {
        return state.cluster.clusters.clusters
      }
    }),
    filterClusters: function () {
      return this.searchCluster ? this.clusters.filter(cluster => cluster.clusterLabel.toLowerCase().includes(this.searchCluster)) : this.clusters
    }
  },
  methods: {
    ...mapActions({
      fetchClusters: type.FETCH_CLUSTERS,
      fetchDelCluster: type.FETCH_DEL_CLUSTER
    }),
    addHost (name) {
      this.$refs.addHost.open(name)
    },
    async listCluster () {
      this.listLoading = true
      await this.fetchClusters().catch(() => { })
      this.listLoading = false
    },
    async openDelete (clusterLabel) {
      if (clusterLabel.machineNum || clusterLabel.appNum) {
        this.$refs.deleteDialog.open(clusterLabel)
      } else {
        await Confirm.open(`确认移除该集群?`)
        await cluster.delCluster(clusterLabel.clusterLabel)
        this.listCluster()
      }
    },
    openCreate () {
      this.$refs.createDialog.open()
    },
    reload () {
      this.listCluster()
    }
  },
  mounted () {
    this.listCluster()
  }
}
</script>
<style scoped>
.btn-group {
  justify-content: space-between;
}

.cluster-card {
  width: 100%;
  margin-bottom: 20px;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin: 13px 0;
  line-height: 12px;
}

.clusterDetail {
  padding: 0;
  float: right;
}

.cluster-app {
  text-align: right;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.cluster-host {
  text-align: right;
  font-size: 35px;
  height: 76px;
  line-height: 76px;
  font-weight: 200;
  color: #666;
}

.cluster-title {
  font-size: 25px;
}
</style>
