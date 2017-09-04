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

    <el-row v-loading="listLoading" v-if="filterCmpTemplates.length">
      <el-col :span="7" v-for="(template, index) in filterCmpTemplates" :key="index" style="margin: 15px 15px 15px 0px">
        <el-card :body-style="{ padding: '20px' }">
          <h1>{{template.name}}</h1>
          <div style="padding: 20px;">
            <span>{{template.desc || '暂无描述'}}</span>
            <div class="bottom clearfix">
              <time class="time">{{template.created_at}}</time>
              <el-dropdown class="buttonGroup" trigger="click">
                <span class="el-dropdown-link">
                  下拉菜单
                  <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>部署</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                  <el-dropdown-item>更新</el-dropdown-item>
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
// import Confirm from '@/utils/confirm'
import CreateComposeTem from '@/views/compose-template/modals/CreateCmpTemplate'
// import * as cmpTemplate from '@/api/compose-template'
import * as type from '@/store/compose-template/mutations_types'

export default {
  components: {
    CreateComposeTem
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
    async listCmpTemplate () {
      this.listLoading = true
      await this.fetchCmpTemplates().catch(() => { })
      // await catch is a hack func to call this expression
      this.listLoading = false
    },
    openCreate () {
      this.$refs.createCmpTemplate.open()
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
</style>

