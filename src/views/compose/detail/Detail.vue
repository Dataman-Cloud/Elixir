<template>
  <div>
    <div style="margin-bottom: 20px;">
      <h3>
        {{composeName}}
      </h3>
    </div>

    <el-tabs type="card" :value="currentView" @tab-click="tabChange">
      <el-tab-pane name="apps">
        <span class="el-tab-label" slot="label">
          <a></a>应用</span>
      </el-tab-pane>

      <transition name="fade" mode="out-in">
        <component v-bind:is="currentView"></component>
      </transition>
    </el-tabs>
  </div>
</template>
<script>
import { Apps } from './tabs'
import { mapState } from 'vuex'
import store from '@/store'
import * as type from '@/store/compose/mutations_types'

export default {
  components: {
    apps: Apps
  },
  data () {
    return {
      currentView: 'apps'
    }
  },
  computed: {
    ...mapState({
      composeName (state) {
        return state.compose.compose.name
      }
    })
  },
  methods: {
    tabChange (tab, event) {
      this.currentView = tab.name
    }
  },
  beforeRouteEnter (to, from, next) {
    store.dispatch(type.FETCH_COMPOSE, to.params.id)
      .then(() => next())
  },
  watch: {
    $route (to) {
      this.$store.dispatch(type.FETCH_COMPOSE, this.$route.params.id)
    }
  }
}
</script>

