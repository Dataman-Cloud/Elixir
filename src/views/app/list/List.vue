<template>
  <div>
    <div class="btn-group">
      <router-link class="pan-btn pink-btn" to="/app/create">
        <el-button type="primary">创建应用</el-button>
      </router-link>
    </div>

    <el-table
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%">
      <el-table-column
        property="name"
        label="姓名"
        width="120">
        <template scope="app">
          <router-link :to="{name: '应用详情', params:{id : 1}}">{{app.row.name}}</router-link>
        </template>
      </el-table-column>
      <el-table-column
        property="date"
        label="日期"
        width="120">
      </el-table-column>
      <el-table-column
        property="address"
        label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        currentRow: null
      }
    },

    methods: {
      handleCurrentChange (val) {
        this.currentRow = val
      }
    }
  }
</script>

<style scoped>
  .btn-group {
    display: flex;
    margin-bottom: 10px;
  }

  .btn-group a:not(:first-child) {
    margin: 0 5px;
  }

</style>
