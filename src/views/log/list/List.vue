<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form" label-width="100px" class="demo-form-inline" :inline="true" label-position="left">
      <el-form-item label="集群名" prop="clusterName" required>
        <el-select v-model="form.clusterName" @change="clusterValChange" @visible-change="selectCluster" placeholder="请选择集群">
          <el-option :key="cluster.id" v-for="cluster in clusters" :value="cluster.clusterLabel">{{cluster.clusterLabel}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="应用名" prop="appName" required>
        <el-select v-model="form.appName" :disabled="!form.clusterName" @change="appValChange" @visible-change="selectApps" placeholder="请选择应用">
          <el-option :key="app.name" v-for="app in apps" :label="app.name" :value="app.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="实例名" prop="taskId">
        <el-select v-model="form.taskId" :disabled="!form.appName" @visible-change="selectTasks" placeholder="请选择实例">
          <el-option value="" label="全部实例">全部实例</el-option>
          <el-option :key="task.name" v-for="task in tasks" :label="task.name" :value="task.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关键字" prop="key">
        <el-input v-model="form.key"></el-input>
      </el-form-item>
      <el-form-item label="起始时间" prop="beginTime">
        <el-date-picker type="datetime" placeholder="选择日期" v-model="form.beginTime" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="截止时间" prop="endTime">
        <el-date-picker type="datetime" placeholder="选择日期" v-model="form.endTime" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="resetForm">重置</el-button>
        <a class="el-button link-button" v-if="logs.length" :href="downloadUrl">下载</a>
      </el-form-item>
    </el-form>

    <infinite-list :items="logs" ref="infiniteList" @onInfinite="infinite" class="log-list">
      <template slot="item" scope="props">
        <p class="logItem">
          <span>{{props.row.fields.time[0] | formatTime('{y}-{m}-{d} {h}:{i}:{s}')}} {{props.row.fields.log[0]}}</span>
        </p>
      </template>
    </infinite-list>
  </div>
</template>
<script>
import InfiniteList from '@/components/infinite-loading-list/InfiniteList'
import { mapActions } from 'vuex'
import * as type from '@/store/log/mutations_types'
import * as fetchLogs from '@/api/log'
import BASE_URL from 'baseUrl'

const MAX_ITEMS = 100
const MAX_DOWNLOAD_ITEMS = 500

export default {
  components: {
    InfiniteList
  },
  data () {
    return {
      clusters: [],
      apps: [],
      tasks: [],
      logs: [],
      isContext: false,
      ajaxLicense: false,
      form: {
        clusterName: '',
        appName: '',
        taskId: '',
        key: '',
        beginTime: '',
        endTime: '',
        page: 0,
        size: 20
      },
      rules: {
        clusterName: [
          { required: true, message: '请选择集群' }
        ],
        appName: [
          { required: true, message: '请选择应用' }
        ]
      }
    }
  },
  computed: {
    base64Form: function () {
      // 下载限制为 MAX_DOWNLOAD_ITEMS 条数据
      let downQuery = this._.merge({}, this.form, { page: 0, size: MAX_DOWNLOAD_ITEMS })
      return window.btoa(JSON.stringify(downQuery))
    },
    downloadUrl: function () {
      return `${BASE_URL}/v1/logger/downloadESLogger?json=${this.base64Form}`
    }
  },
  methods: {
    ...mapActions({
      fetchClusters: type.FETCH_SELECTCLUSTER,
      fetchApps: type.FETCH_SELECTAPPS,
      fetchTasks: type.FETCH_SELECTTASKS
    }),
    appValChange () {
      this.form.taskId = ''
    },
    clusterValChange (val) {
      this.form.appName = ''
      this.form.taskId = ''
    },
    download () {
      this.$refs.form.validate((valid) => valid ? fetchLogs.download(this.base64Form) : false)
    },
    onSubmit () {
      this.ajaxLicense = true
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$refs.infiniteList.$emit('InfiniteReset')
          this.submitLoading = true
          this.logs = []
          this.infinite()
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
        let data = await this.fetchApps(this.form.clusterName)
        this.apps = data.data
      }
    },
    async selectTasks (flag) {
      if (flag) {
        const filterAppArray = value => value.name === this.form.appName
        let appObj = this.apps.find(filterAppArray) || {}
        let data = await this.fetchTasks(appObj.id)
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
        if (this.ajaxLicense) {
          this.form.page = Math.round(this.logs.length / this.form.size)
          fetchLogs.query(this.form).then((res) => {
            if (res.data.hits.hits.length) {
              this.logs = this.logs.concat(res.data.hits.hits)
              this.$refs.infiniteList.$emit('InfiniteLoaded')
              if (this.logs.length / this.form.size === MAX_ITEMS) {
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

.link-button {
  color: #fff;
  text-decoration: none;
  background-color: #20a0ff;
  border-color: #20a0ff;
}

.link-button:hover {
    background: #4db3ff;
    border-color: #4db3ff;
}
</style>
