<template>
  <div>
    <el-form :model="form" :inline="true" class="demo-form-inline">
      <el-form-item label="起止时间">
        <el-date-picker
          v-model="form.timeRange"
          type="datetimerange"
          :picker-options="dataTimePickeOpt"
          placeholder="选择时间范围"
          align="right">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="关键字">
        <el-input v-model="form.keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="histories"
      border
      v-loading="listLoading"
      style="width: 100%">
      <el-table-column
        sortable show-overflow-tooltip
        width="200"
        property="ObjectType"
        label="对象类型">
      </el-table-column>
      <el-table-column
        property="operation"
        sortable label="介绍">
      </el-table-column>
      <el-table-column
        property="operator"
        sortable label="人">
      </el-table-column>
      <el-table-column
        property="createdAt"
        sortable label="创建时间">
        <template scope="scope">
          <span>{{scope.row.createdAt | formatTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import * as type from '@/store/registry/mutations_types'

  export default {
    data () {
      return {
        listLoading: false,
        form: {
          timeRange: [null, null],
          keyword: null
        },
        dataTimePickeOpt: {
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        }
      }
    },
    computed: {
      ...mapState({
        histories (state) {
          return state.registry.audits.audits.audits
        }
      })
    },
    methods: {
      ...mapActions({
        fetchHistories: type.FETCH_HISTORIES
      }),
      formatSubmitData (form) {
        let timeRangeObj = this._.zipObject(['start', 'end'], form.timeRange.map(v => v ? (new Date(v).getTime()) : null))
        return {keyword: form.keyword ? form.keyword : null, ...timeRangeObj}
      },
      onSubmit () {
        this.fetchHistories(this.formatSubmitData(this.form))
      }
    },
    created () {
      this.listLoading = true
      this.fetchHistories()
        .then(() => {
          this.listLoading = false
        })
    }
  }
</script>

<style>

</style>
