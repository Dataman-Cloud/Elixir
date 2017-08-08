<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form" label-width="100px" class="demo-form-inline" :inline="true" label-position="left">
      <el-form-item label="集群名" prop="clusterName" required>
        <el-select v-model="form.clusterName" @change="clusterValChange" @visible-change="selectCluster" placeholder="请选择集群">
          <el-option :key="cluster.id" v-for="cluster in clusters" :value="cluster.clusterLabel">{{cluster.clusterLabel}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="应用名" prop="appName" required>
        <el-select v-model="form.appName" @change="appValChange" @visible-change="selectApps" placeholder="请选择应用">
          <el-option :key="app.id" v-for="app in apps" :value="app.id">{{app.id}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="实例名" prop="taskName">
        <el-select v-model="form.taskName" @visible-change="selectTasks" placeholder="请选择实例">
          <el-option :key="task.id" v-for="task in tasks" :value="task.name">{{task.name}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关键字" prop="keyWord">
        <el-input v-model="form.keyWord"></el-input>
      </el-form-item>
      <el-form-item label="起始时间" prop="start">
        <el-date-picker type="datetime" placeholder="选择日期" v-model="form.start" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="截止时间" prop="end">
        <el-date-picker type="datetime" placeholder="选择日期" v-model="form.end" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">查询</el-button>
        <el-button type="primary" @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>

    <infinite-list :items="logs" ref="infiniteList" @onInfinite="infinite" class="log-list">
      <template slot="item" scope="props">
        <p class="logItem" @click.stop.prevent="getContext">
          <span>标题：</span>
          <span>{{props.row.title}}</span>
        </p>
        <!--<i class="fa fa-arrow-right" @click.stop.prevent="getContext"></i>-->
      </template>
    </infinite-list>
  </div>
</template>
<script>
import InfiniteList from '@/components/infinite-loading-list/InfiniteList'
import axios from 'axios'
import { mapActions } from 'vuex'
import * as type from '@/store/log/mutations_types'
const api = 'http://hn.algolia.com/api/v1/search_by_date'

export default {
  components: {
    InfiniteList
  },
  data () {
    return {
      clusters: [],
      apps: [],
      tasks: [],
      logMaxLen: 1000,
      logs: [],
      tag: 'story',
      isContext: false,
      judgeValue: '',
      form: {
        clusterName: '',
        appName: '',
        taskName: '',
        keyWord: '',
        start: '',
        end: ''
      },
      rules: {
        clusterName: [
            { required: true, message: '请选择集群名称' }
        ],
        appName: [
            { required: true, message: '请选择应用名称' }
        ],
        taskName: [
            { required: true, message: '请选择实例名称' }
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      fetchClusters: type.FETCH_SELECTCLUSTER,
      fetchApps: type.FETCH_SELECTAPPS,
      fetchTasks: type.FETCH_SELECTTASKS
    }),
    appValChange () {
      this.form.taskName = ''
    },
    clusterValChange (val) {
      this.form.appName = ''
      this.form.taskName = ''
    },
    getContext () {
      this.isContext = true
      this.logs = []
      this.infinite()
    },
    onSubmit (form) {
      this.isContext = false
      this.logs = []
      this.infinite()
      this.$refs.form.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          return false
        }
      })
    },
    async selectCluster (flag) {
      if (flag) {
        let data = await this.fetchClusters()
        this.clusters = data.data
      }
    },
    async selectApps (flag) {
      if (flag) {
        let data = await this.fetchApps()
        this.apps = data.data
      }
    },
    async selectTasks (flag) {
      if (flag) {
        let data = await this.fetchTasks(this.form.appName)
        this.tasks = data.data
      }
    },
    resetForm () {
      this.$refs.form.resetFields()
    },
    infinite () {
      if (this.isContext) {
        // TODO 调用上下文的 ajax
      } else {
        axios.get(api, {
          params: {
            tags: this.tag,
            page: this.logs.length / 20 + 1
          }
        }).then((res) => {
          if (res.data.hits.length) {
            this.logs = this.logs.concat(res.data.hits)
            this.$refs.infiniteList.$emit('InfiniteLoaded')
            if (this.logs.length / 20 === 10) {
              this.$refs.infiniteList.$emit('InfiniteComplete')
            }
          } else {
            this.$refs.infiniteList.$emit('InfiniteComplete')
          }
        })
      }
    }
  }
}
</script>
<style scoped>
.log-list {
  width: 100%;
  background-color: #000;
  color: #fff;
  height: 70vh;
  overflow-y: scroll;
  padding: 25px 0;
}

.logItem {
  line-height: 30px;
  padding: 0 25px;
  word-wrap: break-word;
}

.logItem:hover {
  line-height: 30px;
  background: rgba(52, 152, 219, 0.4) url(../../../assets/arrow-right.png) right no-repeat;
  color: #fff;
  background-size: 20px 20px;
}
</style>
