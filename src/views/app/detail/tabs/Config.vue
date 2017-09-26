<template>
  <div>
    <dl class="detail-config">
      <dt>镜像地址</dt>
      <dd>{{version.container.docker.image}}</dd>
    </dl>

    <dl class="detail-config">
      <dt>容器规格</dt>
      <dd>
        <dl id="cpu">
          <dt>
            <small>CPU:</small>
          </dt>
          <dd>
            <small>{{version.cpus}}</small>
          </dd>
        </dl>
        <dl id="mem">
          <dt>
            <small>Mem:</small>
          </dt>
          <dd>
            <small>{{version.mem}} MB</small>
          </dd>
        </dl>
      </dd>
    </dl>

    <dl class="detail-config">
      <dt>容器个数</dt>
      <dd>{{version.instances}}</dd>
    </dl>

    <dl class="detail-config">
      <dt>应用模式</dt>
      <dd>{{version.container.docker.network}} 模式</dd>
    </dl>

    <dl class="detail-config">
      <dt>访问网关</dt>
      <dd>
        <dl>
          <dd>
            <small>{{version.proxy.enabled ? '开启' : '关闭' }} </small>
          </dd>
        </dl>
        <dl>
          <dt>别名: </dt>
          <dd>
            <small>{{ version.proxy.alias ? version.proxy.alias: '-'}} </small>
          </dd>
        </dl>
        <dl>
          <dt>会话保持: </dt>
          <dd>
            <small>{{ version.proxy.sticky ? '开启' : '关闭'}} </small>
          </dd>
        </dl>
        <dl>
          <dt>网关端口: </dt>
          <dd>
            <small>{{ version.proxy.listen ? version.proxy.listen : '-'}} </small>
          </dd>
        </dl>
      </dd>
    </dl>

    <dl class="detail-config">
      <dt>端口映射</dt>
      <dd>
        <template v-if="version.container.docker.portMappings.length">
          <el-table :data="version.container.docker.portMappings" stripe style="width: 100%;">
            <el-table-column prop="containerPort" label="应用端口" width="200"></el-table-column>
            <el-table-column prop="protocol" label="协议" width="200"></el-table-column>
            <el-table-column prop="name" label="端口名称" width="200"></el-table-column>
          </el-table>
        </template>
        <span v-else>-</span>
      </dd>
    </dl>

    <dl class="detail-config">
      <dt>健康检查</dt>
      <dd>
        <template v-if="version.healthCheck.length">
          <el-table :data="version.healthCheck" stripe style="width: 100%;">
            <el-table-column prop="protocol" label="协议"></el-table-column>
            <el-table-column prop="gracePeriodSeconds" label="宽限时间" width="100"></el-table-column>
            <el-table-column prop="intervalSeconds" label="检查间隔" width="100"></el-table-column>
            <el-table-column prop="timeoutSeconds" label="检查超时" width="100"></el-table-column>
            <el-table-column prop="maxConsecutiveFailures" label="最多持续失败次数" width="160"></el-table-column>
            <el-table-column prop="delaySeconds" label="延迟时间" width="100"></el-table-column>
            <el-table-column prop="path" label="路径" width="80"></el-table-column>
          </el-table>
        </template>
        <span v-else>-</span>
      </dd>
    </dl>

    <dl class="detail-config">
      <dt>存储挂载路径</dt>
      <dd>
        <template v-if="version.container.volumes.length">
          <el-table :data="version.container.volumes" stripe style="width: 100%;">
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
        <template v-if="version.envs.length">
          <el-table :data="version.envs" stripe style="width: 100%;">
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
        <template v-if="version.container.docker.parameters.length">
          <el-table :data="version.container.docker.parameters" stripe style="width: 100%;">
            <el-table-column prop="key" show-overflow-tooltip label="KEY" width="200"></el-table-column>
            <el-table-column prop="value" show-overflow-tooltip label="VALUE" width="200"></el-table-column>
          </el-table>
        </template>
        <span v-else>-</span>
      </dd>
    </dl>

    <dl class="detail-config">
      <dt>CMD</dt>
      <dd v-if="version.cmd">{{version.cmd}}</dd>
      <dd v-else>-</dd>
    </dl>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapState({
      version ({app}) {
        app.app.version.healthCheck = [app.app.version.healthCheck]
        return app.app.version
      }
    })
  }
}
</script>

