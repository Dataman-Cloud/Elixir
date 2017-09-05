<template>
  <div>
    <div class="btn-group">
      <span>
        <el-button type="primary" @click="reload">
          <span class="glyphicon glyphicon-repeat" aria-hidden="true"></span>
        </el-button>
        <el-button type="primary" @click="openCreate">
          <i class="ion-ios-plus-outline"></i> 创建模板
        </el-button>
      </span>

      <el-button-group style="display: flex">
        <el-input class="el-input-search" icon="search" v-model="searchWord" placeholder="请输入模板名称"></el-input>
      </el-button-group>
    </div>

    <create-compose-tem ref="createCmpTemplate"></create-compose-tem>
    <deploy-compose-tem ref="deployCmpTemplate"></deploy-compose-tem>

    <el-row v-loading="listLoading" v-if="filterCmpTemplates.length">
      <el-col :span="7" v-for="(template, index) in filterCmpTemplates" :key="index" style="margin: 15px 15px 15px 0px">
        <el-card :body-style="{ padding: '20px' }">
          <h1>{{template.name}}</h1>
          <div style="padding: 20px;">
            <span class="template-desc">{{template.description || '暂无描述'}}</span>

            <div class="bottom clearfix">
              <time class="time">{{template.created_at}}</time>
              <el-dropdown class="buttonGroup" trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                  操作
                  <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="{type: 'openDeploy', data: template}">部署</el-dropdown-item>
                  <el-dropdown-item :command="{type: 'delete', data: template}">删除</el-dropdown-item>
                  <el-dropdown-item :command="{type: 'update', data: template}">编辑</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row v-else>暂无数据</el-row>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Confirm from '@/utils/confirm'
import CreateComposeTem from '@/views/compose-template/modals/CreateCmpTemplate'
import DeployComposeTem from '@/views/compose-template/modals/DeployCmpTemplate'
import * as api from '@/api/compose-template'
import * as type from '@/store/compose-template/mutations_types'

export default {
  components: {
    CreateComposeTem,
    DeployComposeTem
  },
  data () {
    return {
      listLoading: false,
      searchWord: ''
    }
  },
  computed: {
    ...mapState({
      cmpTemplates (state) {
        return state.cmpTemplate.cmpTemplates.cmpTemplates
      }
    }),
    filterCmpTemplates: function () {
      return this.searchWord ? this.cmpTemplates.filter(cmpTemplate => cmpTemplate.name.toLowerCase().includes(this.searchWord)) : this.cmpTemplates
    }
  },
  methods: {
    ...mapActions({
      fetchCmpTemplates: type.FETCH_COMPOSE_TEMPLATES
    }),
    handleCommand ({ type, data }) {
      switch (type) {
        case 'openDeploy':
          this.openDeploy(data.id)
          break
        case 'delete':
          this.deleteTemplate(data.id)
          break
        case 'update':
          this.updateTemplate(data.id)
          break
        default:
          break
      }
    },
    async deleteTemplate (id) {
      await Confirm.open(`确认删除该编排模板?`)
      await api.deleteTemplate(id)
      this.$notify({ message: '删除成功' })
      this.listCmpTemplate()
    },
    async listCmpTemplate () {
      this.listLoading = true
      await this.fetchCmpTemplates().catch(() => { })
      // await catch is a hack func to call this expression
      this.listLoading = false
    },
    updateTemplate (id) {
      this.$refs.createCmpTemplate.open(id)
    },
    openCreate () {
      this.$refs.createCmpTemplate.open()
    },
    openDeploy (id) {
      this.$refs.deployCmpTemplate.open(id)
    },
    reload () {
      this.listCmpTemplate()
    }
  },
  mounted () {
    this.listCmpTemplate()
  }
}
</script>
<style scoped>
.btn-group {
  justify-content: space-between;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.buttonGroup {
  padding: 0;
  float: right;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.template-desc {
  display: inline-block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

