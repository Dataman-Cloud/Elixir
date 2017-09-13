<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
            <div class="card-title">主机</div>
            <div>
              <pie-chart id="host" height='290px' width='100%' :legend="legend" :serieDatas="serieDatas"></pie-chart>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" :offset="2">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
            <div class="card-title">应用</div>
            <div style="width:100%;height:290px;">
              <h2 class="card-num">1</h2>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" :offset="2">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
            <div class="card-title">容器</div>
            <div style="width:100%;height:290px;">
              <h1 class="card-num">2</h1>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top:20px;">
      <el-col :span="24">
        <h1 class="dashboard-title">
          资源使用量
        </h1>
      </el-col>
      <el-col :span="10">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
            <div class="card-title">CPU使用量</div>
            <bar-chart id="cpu" width='100%' height='300px'></bar-chart>
          </div>
        </el-card>
      </el-col>
      <el-col :span="10" :offset="2">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
            <div class="card-title">内存使用量</div>
            <bar-chart id="mem" width='100%' height='300px'></bar-chart>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import LineChart from '@/components/charts/Line'
import PieChart from '@/components/charts/Pie'
import BarChart from '@/components/charts/Bar'

export default {
  components: {
    PieChart,
    LineChart,
    BarChart
  },
  data () {
    return {
      currentDate: new Date(),
      legend: ['正常数', '异常数', '健康'],
      serieDatas: [
        { value: 335, name: '正常数' },
        { value: 310, name: '异常数' },
        { value: 200, name: '健康' }
      ],
      title: '主机数',
      bar: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      cpuSeries: [10, 52, 200, 334, 390, 330, 220]
    }
  }
}
</script>
<style scoped>
.dashboard-title{
  font-size: 20px;
  height: 50px;
  line-height: 24px;
}
.card-title{
  font-size: 18px;
  text-align: center;
}
.card-num{
  line-height: 290px;
  text-align: center;
  font-size: 100px;
}
</style>
