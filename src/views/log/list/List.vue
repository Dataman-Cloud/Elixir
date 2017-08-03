<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px" class="demo-form-inline" :inline="true" label-position="left">
      <el-form-item label="集群名" required>
        <el-select v-model="form.clusterName" placeholder="请选择活动区域">
          <el-option label="持续集成demo1" value="持续集成demo1"></el-option>
          <el-option label="持续集成demo2" value="持续集成demo2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="应用名" required>
        <el-select v-model="form.appName" placeholder="请选择活动区域">
          <el-option label="jenkins-demo1" value="jenkins-demo1"></el-option>
          <el-option label="jenkins-demo2" value="jenkins-demo2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="实例名">
        <el-select v-model="form.taskName" placeholder="请选择活动区域">
          <el-option label="ALL" value="all"></el-option>
          <el-option label="task1" value="task1"></el-option>
          <el-option label="task2" value="task2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关键字">
        <el-input v-model="form.keyWord"></el-input>
      </el-form-item>
      <el-form-item label="起始时间" required>
        <el-date-picker type="datetime" placeholder="选择日期" v-model="form.start" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="截止时间" required>
        <el-date-picker type="datetime" placeholder="选择日期" v-model="form.end" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询
        </el-button>
      </el-form-item>
    </el-form>

    <infinite-list :items="logs" ref="infiniteList" @onInfinite="infinite"
                   class="log-list">
      <template slot="item" scope="props">
        <p class="logItem" @click.stop.prevent="getContext">
          <span>标题：</span><span>{{props.row.title}}</span>
        </p>
        <!--<i class="fa fa-arrow-right" @click.stop.prevent="getContext"></i>-->
      </template>
    </infinite-list>

  </div>
</template>
<script>
  import InfiniteList from '@/components/infinite-loading-list/InfiniteList'
  import axios from 'axios'
  const api = 'http://hn.algolia.com/api/v1/search_by_date'

  export default {
    components: {
      InfiniteList
    },
    data () {
      return {
        logMaxLen: 1000,
        logs: [],
        tag: 'story',
        isContext: false,
        form: {
          clusterName: '',
          appName: '',
          taskName: '',
          keyWord: '',
          start: '',
          end: ''
        }
      }
    },
    methods: {
      getContext () {
        console.log('22222')
        this.isContext = true
        this.logs = []
        this.infinite()
      },
      onSubmit () {
        this.isContext = false
        this.logs = []
        this.infinite()
      },
      infinite () {
        if (this.isContext) {
          console.log('33333')
            // TODO 调用上下文的 ajax
        } else {
          console.log('44444')
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
  .logItem{
    line-height: 30px;
    padding: 0 25px;
    word-wrap: break-word;
  }
  .logItem:hover{
    line-height: 30px;
    background: rgba(52, 152, 219, 0.4) url(../../../assets/arrow-right.png) right no-repeat;
    color: #fff;
    background-size:20px 20px;
  }
</style>
