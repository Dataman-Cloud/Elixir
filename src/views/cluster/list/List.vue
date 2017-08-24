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
      <el-col class="cluster-card" :span="8" v-for="(o, index) in 4" :key="o">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
            <router-link class="ellipsis" :to="{name: '集群详情'}">
              集群名
            </router-link>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-row :gutter="20">
                  <el-col :span="8">
                    <div class="bottom clearfix">
                      <time class="time">用户组</time>
                      <el-button type="text" class="button">lll</el-button>
                    </div>
                    <div class="bottom clearfix">
                      <time class="time">创建时间</time>
                      <el-button type="text" class="button">lll</el-button>
                    </div>
                    <div class="bottom clearfix">
                      <time class="time">创建者</time>
                      <el-button type="text" class="button">lll</el-button>
                    </div>

                  </el-col>
                  <el-col :span="8" class="cluster-right">
                    <h2>11</h2>
                    <p>fjeoiw</p>
                  </el-col>
                  <el-col :span="8" class="cluster-right">
                    <h2>11</h2>
                    <p>fjeoiw</p>
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
import CreateDialog from '@/views/cluster/modals/CreateDialog'
import DeleteDialog from '@/views/cluster/modals/DeleteDialog'
import AddDialog from '@/views/cluster/modals/AddDialog'
export default {
  components: {
    CreateDialog,
    DeleteDialog,
    AddDialog
  },
  data () {
    return {}
  },
  methods: {
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

.button {
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
