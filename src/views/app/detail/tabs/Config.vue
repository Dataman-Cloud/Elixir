<template>
  <div>
    <h4 class="detail-config-label">配置</h4>
    <dl class="detail-config">
      <dt>镜像地址</dt>
      <dd>{{curVersionObj.container.docker.image}}</dd>
    </dl>

    <dl class="detail-config">
      <dt>容器规格</dt>
      <dd>
        <dl id="cpu">
          <dt>
            <small>CPU</small>
          </dt>
          <dd>
            <small>{{curVersionObj.cpus}}</small>
          </dd>
        </dl>
        <dl id="mem">
          <dt>
            <small>Mem</small>
          </dt>
          <dd>
            <small>{{curVersionObj.mem}} MB</small>
          </dd>
        </dl>
      </dd>
    </dl>

    <dl class="detail-config">
      <dt>容器个数</dt>
      <dd>{{curVersionObj.instances}}
        <span v-if="oneContainer">(每台主机只能运行一个当前容器应用)</span>
      </dd>
    </dl>

    <dl class="detail-config">
      <dt>应用模式</dt>
      <dd>{{curVersionObj.container.docker.network}} 模式</dd>
    </dl>

    <dl class="detail-config">
      <dt>端口映射</dt>
      <dd>
        <template v-if="curVersionObj.container.docker.portMappings.length">
          <el-table :data="curVersionObj.container.docker.portMappings" stripe style="width: 100%;">
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
      <dt>健康检查</dt>
      <dd>
        <template v-if="curVersionObj.healthChecks.length">
          <el-table :data="curVersionObj.healthChecks" stripe style="width: 100%;">
            <el-table-column prop="protocol" label="协议"></el-table-column>
            <el-table-column prop="gracePeriodSeconds" label="宽限时间" width="100"></el-table-column>
            <el-table-column prop="intervalSeconds" label="检查间隔" width="100"></el-table-column>
            <el-table-column prop="timeoutSeconds" label="检查超时" width="100"></el-table-column>
            <el-table-column prop="consecutiveFailures" label="失败次数" width="100"></el-table-column>
            <el-table-column prop="delaySeconds" label="延迟时间" width="100"></el-table-column>
            <el-table-column prop="path" label="path" width="80"></el-table-column>
            <el-table-column prop="portName" label="端口名称" width="100"></el-table-column>
          </el-table>
        </template>
        <span v-else>-</span>
      </dd>
    </dl>

    <dl class="detail-config">
      <dt>存储挂载路径</dt>
      <dd>
        <template v-if="curVersionObj.container.volumes.length">
          <el-table :data="curVersionObj.container.volumes" stripe style="width: 100%;">
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
        <template v-if="curVersionObj.envs.length">
          <el-table :data="curVersionObj.envs" stripe style="width: 100%;">
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
        <template v-if="curVersionObj.container.docker.parameters.length">
          <el-table :data="curVersionObj.container.docker.parameters" stripe style="width: 100%;">
            <el-table-column prop="key" show-overflow-tooltip label="KEY" width="200"></el-table-column>
            <el-table-column prop="value" show-overflow-tooltip label="VALUE" width="200"></el-table-column>
          </el-table>
        </template>
        <span v-else>-</span>
      </dd>
    </dl>

    <dl class="detail-config">
      <dt>CMD</dt>
      <dd v-if="curVersionObj.cmd">{{curVersionObj.cmd}}</dd>
      <dd v-else>-</dd>
    </dl>

  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'

  export default {
    data () {
      return {}
    },
    computed: {
      ...mapState({
        curVersionObj (state) {
          return state.app.app.curVersionObj
        }
      }),
      ...mapGetters([
        'oneContainer'
      ])
    },
    created: function () {}
  }
</script>

