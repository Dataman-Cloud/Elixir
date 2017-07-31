<template>
  <div>
    <div style="margin-bottom: 20px;">
      <header>
        <h3>{{app.id.replace(/\./g, '-')}}</h3>
      </header>
      <el-row :gutter="20">
        <el-col :span="8" v-for="(value, key) in infoListEntries" :key="key">
          <dl class="info-list">
            <dt>{{key}}:</dt>
            <dd>{{value}}</dd>
          </dl>
        </el-col>
      </el-row>
    </div>

    <el-tabs type="card" :value="currentView" @tab-click="tabChange">
      <el-tab-pane name="instances">
        <span class="el-tab-label" slot="label">
          <a></a>实例</span>
      </el-tab-pane>
      <el-tab-pane name="versions">
        <span class="el-tab-label" slot="label">
          <a></a>版本</span>
      </el-tab-pane>
      <!-- <el-tab-pane name="config">
                  <span class="el-tab-label" slot="label">
                    <a></a>配置</span>
                </el-tab-pane> -->
      <!--<el-tab-pane name="debug">-->
      <!--<span class="el-tab-label" slot="label"><a></a>调试</span>-->
      <!--</el-tab-pane>-->

      <transition name="fade" mode="out-in">
        <component v-bind:is="currentView"></component>
      </transition>
    </el-tabs>
  </div>
</template>
<script>
import { Instances, Config, Debug, Topology, Versions } from './tabs'
import { mapState } from 'vuex'
import store from '@/store'
import { formatTime } from '@/filters'
import * as type from '@/store/app/mutations_types'

export default {
  components: {
    instances: Instances,
    config: Config,
    debug: Debug,
    topology: Topology,
    versions: Versions
  },
  data () {
    return {
      currentView: 'instances'
    }
  },
  computed: {
    ...mapState({
      app (state) {
        return state.app.app
      }
    }),
    infoListEntries: function () {
      return {
        '当前版本': this.app.currentVersion[0],
        '网络模式': this.app.curVersionObj.container.docker.network,
        '镜像': this.app.curVersionObj.container.docker.image,
        '更新时间': formatTime(this.app.updated, '{y}-{m}-{d} {h}:{i}:{s}')
      }
    }
  },
  methods: {
    tabChange (tab, event) {
      this.currentView = tab.name
    }
  },
  beforeRouteEnter (to, from, next) {
    store.dispatch(type.FETCH_APP, to.params.id)
      .then(() => next())
  },
  watch: {
    $route (to) {
      this.$store.dispatch(type.FETCH_APP, this.$route.params.id)
    }
  }
}
</script>

