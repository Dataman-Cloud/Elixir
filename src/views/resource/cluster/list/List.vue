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
        <el-input class="el-input-search" icon="search" placeholder="请输入集群名称"></el-input>
      </el-button-group>
    </div>

    <create-dialog ref="createDialog"></create-dialog>
    <el-row>
      <el-col v-loading="listLoading" class="cluster-card" :span="8" v-for="(cluster, index) in clusters" :key="index">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
            <router-link class="ellipsis" :to="{name: '集群详情',params:{name : cluster.clusterLabel}}">
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
                      <span class="clusterDetail">{{cluster.groupId}}</span>
                    </div>

                  </el-col>
                  <el-col :span="5" class="cluster-right">
                    <h2>主机</h2>
                    <p>2</p>
                  </el-col>
                  <el-col :span="5" class="cluster-right">
                    <h2>应用</h2>
                    <p>2</p>
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
              <el-button type="danger" icon="delete" @click="openDelete"></el-button>
              <el-button type="primary" @click="addHost" icon="plus"></el-button>
            </el-button-group>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <delete-dialog ref="deleteDialog"></delete-dialog>
    <Add-Dialog ref="addHost"></Add-Dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import * as type from '@/store/cluster/mutations_types'
import CreateDialog from '@/views/resource/cluster/modals/CreateDialog'
import DeleteDialog from '@/views/resource/cluster/modals/DeleteDialog'
import AddDialog from '@/views/resource/cluster/modals/AddDialog'
export default {
  components: {
    CreateDialog,
    DeleteDialog,
    AddDialog
  },
  data () {
    return {
      listLoading: false
    }
  },
  computed: {
    ...mapState({
      clusters (state) {
        return state.cluster.clusters.clusters
      }
    })
  },
  methods: {
    ...mapActions({
      fetchClusters: type.FETCH_CLUSTERS
    }),
    listApp () {
      return this.fetchClusters().then(() => {
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    openCreate () {
      this.$refs.createDialog.open()
    },
    reload () {

    },
    openDelete () {
      this.$refs.deleteDialog.open()
    },
    addHost () {
      this.$refs.addHost.open()
    }
  },
  mounted () {
    this.listLoading = true
    this.fetchClusters()
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

.cluster-center {
  text-align: center;
}

.cluster-right {
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
</style>
