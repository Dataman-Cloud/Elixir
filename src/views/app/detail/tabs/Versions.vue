<template>
  <div>
    <div class="btn-group">
      <span>
        <el-button type="primary" @click="reload">
          <i class="glyphicon glyphicon-repeat"></i>
        </el-button>
      </span>
    </div>

    <el-table :data="versions" row-key="id" style="width: 100%" :expand-row-keys="defaultOpenItems" ref="table">
      <el-table-column type="expand">
        <template scope="version">
          <dl class="detail-config">
            <dt>镜像地址</dt>
            <dd>{{version.row.container.docker.image}}</dd>
          </dl>

          <dl class="detail-config">
            <dt>容器规格</dt>
            <dd>
              <dl id="cpu">
                <dt>
                  <small>CPU</small>
                </dt>
                <dd>
                  <small>{{version.row.cpus}}</small>
                </dd>
              </dl>
              <dl id="mem">
                <dt>
                  <small>Mem</small>
                </dt>
                <dd>
                  <small>{{version.row.mem}} MB</small>
                </dd>
              </dl>
            </dd>
          </dl>

          <dl class="detail-config">
            <dt>容器个数</dt>
            <dd>{{version.row.instances}}</dd>
          </dl>

          <dl class="detail-config">
            <dt>应用模式</dt>
            <dd>{{version.row.container.docker.network}} 模式</dd>
          </dl>

          <dl class="detail-config">
            <dt>端口映射</dt>
            <dd>
              <template v-if="version.row.container.docker.portMappings.length">
                <el-table :data="version.row.container.docker.portMappings" stripe style="width: 100%;">
                  <el-table-column prop="containerPort" label="应用端口" width="200"></el-table-column>
                  <el-table-column prop="protocol" label="协议" width="200"></el-table-column>
                  <el-table-column prop="hostPort" label="主机端口" width="200"></el-table-column>
                  <el-table-column prop="name" label="名称" width="200"></el-table-column>
                </el-table>
              </template>
              <span v-else>-</span>
            </dd>
          </dl>

          <dl class="detail-config">
            <dt>Http Proxy</dt>
            <dd>
              <span>{{version.row.proxy.enabled ? '开启' : '关闭'}} 别名: {{version.row.proxy.alias ? version.row.proxy.alias : '-'}}</span>
            </dd>
          </dl>

          <dl class="detail-config">
            <dt>健康检查</dt>
            <dd>
              <template v-if="version.row.healthChecks.length">
                <el-table :data="version.row.healthChecks" stripe style="width: 100%;">
                  <el-table-column prop="protocol" label="协议"></el-table-column>
                  <el-table-column prop="gracePeriodSeconds" label="宽限时间" width="100"></el-table-column>
                  <el-table-column prop="intervalSeconds" label="检查间隔" width="100"></el-table-column>
                  <el-table-column prop="timeoutSeconds" label="检查超时" width="100"></el-table-column>
                  <el-table-column prop="consecutiveFailures" label="失败次数" width="100"></el-table-column>
                  <el-table-column prop="delaySeconds" label="延迟时间" width="100"></el-table-column>
                  <el-table-column prop="path" label="路径" width="80"></el-table-column>
                  <el-table-column prop="portName" label="端口名" width="100"></el-table-column>
                </el-table>
              </template>
              <span v-else>-</span>
            </dd>
          </dl>

          <dl class="detail-config">
            <dt>存储挂载路径</dt>
            <dd>
              <template v-if="version.row.container.volumes.length">
                <el-table :data="version.row.container.volumes" stripe style="width: 100%;">
                  <el-table-column prop="hostPath" show-overflow-tooltip label="主机路径" width="150"></el-table-column>
                  <el-table-column prop="containerPath" show-overflow-tooltip label="容器路径" width="150"></el-table-column>
                  <el-table-column prop="mode" label="模式" width="100"></el-table-column>
                </el-table>
              </template>
              <span v-else>-</span>
            </dd>
          </dl>

          <dl class="detail-config">
            <dt>环境变量</dt>
            <dd>
              <template v-if="version.row.envs.length">
                <el-table :data="version.row.envs" stripe style="width: 100%;">
                  <el-table-column prop="key" show-overflow-tooltip label="KEY" width="200"></el-table-column>
                  <el-table-column prop="value" show-overflow-tooltip label="VALUE" width="200"></el-table-column>
                </el-table>
              </template>
              <span v-else>-</span>
            </dd>
          </dl>

          <dl class="detail-config">
            <dt>Docker 参数</dt>
            <dd>
              <template v-if="version.row.container.docker.parameters">
                <el-table :data="version.row.container.docker.parameters" stripe style="width: 100%;">
                  <el-table-column prop="key" show-overflow-tooltip label="KEY" width="200"></el-table-column>
                  <el-table-column prop="value" show-overflow-tooltip label="VALUE" width="200"></el-table-column>
                </el-table>
              </template>
              <span v-else>-</span>
            </dd>
          </dl>

          <dl class="detail-config">
            <dt>CMD</dt>
            <dd v-if="version.row.cmd">{{version.row.cmd}}</dd>
            <dd v-else>-</dd>
          </dl>
        </template>
      </el-table-column>
      <el-table-column label="ID" prop="id">
        <template scope="scope">
          <span>{{scope.row.id}} </span>
          <span v-if="currentVersion.indexOf(scope.row.id) >= 0"> ( 当前版本 )</span>
        </template>
      </el-table-column>
      <el-table-column label="内存" prop="mem">
      </el-table-column>
      <el-table-column label="CPU" prop="cpus">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as type from '@/store/app/mutations_types'

export default {
  data () {
    return {
      defaultOpenItems: []
    }
  },
  computed: {
    ...mapState({
      versions ({ app }) {
        return app.app.versions
      },
      currentVersion ({ app }) {
        return app.app.currentVersion
      }
    })
  },
  methods: {
    async reload () {
      this.listLoading = true
      await this.$store.dispatch(type.FETCH_APP, this.$route.params.id).catch(() => (this.listLoading = false))
      this.listLoading = false
    }
  },
  mounted () {
    if (this.versions.length) {
      this.defaultOpenItems = [this.versions[0].id]
    }
  },
  updated () {
    // Element Table internal method, not exposed
    this.$refs.table.store.setExpandRowKeys(this.defaultOpenItems)
  }
}
</script>

<style>
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
