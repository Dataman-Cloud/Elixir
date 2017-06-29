<template>
  <div class="topology-content">
    <el-table
      :data="prolongations"
      style="width: 100%">
      <el-table-column type="expand">
        <template scope="prolong">
          <el-table
            v-if="prolong.row[1].length"
            :data="prolong.row[1]"
            border
            row-key="id"
            style="width: 100%">
            <el-table-column property="id" label="名称" width="150" sortable show-overflow-tooltip></el-table-column>
            <el-table-column
              property="labels.VCLUSTER"
              label="所属集群" sortable>
            </el-table-column>
            <el-table-column
              property="instances"
              label="实例个数" sortable>
            </el-table-column>
            <el-table-column label="健康状态">
              <template scope="app">
                <el-tooltip class="item" effect="dark" placement="top">
                  <div slot="content">
                  <span v-for="(status, index) in app.row.healthData" :key="index" class="state">
                    状态: <span :class="status.state"></span> {{status.state}} 数量: {{status.quantity}}<br>
                  </span>
                  </div>
                  <ul class="progress">
                    <li v-for="(status, index) in app.row.healthData" :key="index" :class="status.state"
                        :style="{width: (status.quantity / app.row.instances) * 100 + '%'}"></li>
                  </ul>
                </el-tooltip>

              </template>
            </el-table-column>
            <el-table-column property="versionInfo.lastConfigChangeAt" label="更新时间" min-width="120" sortable>
              <template scope="scope">
                <span>{{scope.row.versionInfo.lastConfigChangeAt | formatTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
              </template>
            </el-table-column>
          </el-table>
          <p v-else> 暂无数据</p>
        </template>
      </el-table-column>
      <el-table-column
        label="拓展对象">
        <template scope="prolong">
          {{prolong.row[0]}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default{
    data () {
      return {}
    },
    computed: {
      ...mapGetters([
        'prolongations'
      ])
    },
    methods: {},
    mounted () {
    }
  }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
