<template>
  <div>
    <div class="btn-group">
      <span>
        <el-button type="primary" @click="reload"><span class="glyphicon glyphicon-repeat" aria-hidden="true"></span></el-button>
        <el-button type="primary" @click="openWeight"><i class="fa fa-balance-scale" aria-hidden="true"></i> 权重</el-button>
      </span>
    </div>
    <weight-dialog @ok="weightOk" ref="weightDialog"></weight-dialog>
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
import weightDialog from '@/views/app/modals/WeightDialog'

export default {
  components: {
    weightDialog
  },
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
      }]
    }
  },
  methods: {
    reload () {

    },
    openWeight () {
      this.$refs.weightDialog.open()
    },
    weightOk (res) {

    }
  }
}
</script>
<style scoped>
  .btn-group {
    justify-content: space-between;
  }
</style>

