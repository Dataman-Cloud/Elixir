<template>
  <el-table :data="apps" border style="width: 100%">
    <el-table-column property="id" label="应用" width="180" sortable show-overflow-tooltip>
        <template scope="app">
          <router-link :title="app.row.id" class="ellipsis" :to="{name: '应用详情', params:{id : app.row.id}}">{{app.row.id}}</router-link>
        </template>
      </el-table-column>
      <el-table-column property="cluster" label="集群" width="150"></el-table-column>
      <el-table-column property="task_count" label="实例" width="100"></el-table-column>
      <el-table-column property="status" label="运行状态" width="100"></el-table-column>
      <el-table-column label="健康状态">
        <!-- <template scope="app">
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
        </template> -->
        <template scope="app">
          <span>总数: </span>
          <i>{{app.row.health.total}} </i>
          <span> 健康: </span>
          <i>{{app.row.health.healthy}} </i>
          <span> 不健康: </span>
          <i>{{app.row.health.unhealthy}} </i>
          <span> 未设置: </span>
          <i>{{app.row.health.unset}} </i>
        </template>
      </el-table-column>
      <el-table-column property="updated" label="更新时间" min-width="80">
        <template scope="scope">
          <span>{{scope.row.updated | formatTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </template>
      </el-table-column>
  </el-table>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapState({
      apps ({ compose }) {
        return compose.compose.apps
      }
    })
  }
}
</script>
<style scoped>
.btn-group {
  justify-content: space-between;
}
</style>

