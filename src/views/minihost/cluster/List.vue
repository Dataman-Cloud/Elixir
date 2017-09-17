<template>
  <div class="">
    <div class="">
      <router-link :to="createLink">
        <el-button type="primary">创建{{appPrefix}}</el-button>
      </router-link>
    </div>
    <div class="result-grid" v-if="List.length">
        <div :span="8" v-for="li in List" :key="li.name" class="app-item">
          <mini-host-card :item="li" :imgSrc="imgSrc"/>
        </div>
    </div>
    <div class="empty-page" v-else>
      <span>
        暂无迷你集群
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MiniHostCard from '@/views/minihost/components/MiniHostCard'
import * as mhType from '@/store/minihost/mutations_types'

export default {
  name: 'base-app-list',
  components: {
    MiniHostCard
  },
  computed: {
    ...mapGetters({
      List: 'minihostList'
    })
  },
  methods: {
    ...mapActions({
      fetchMh: mhType.FETCH_MINIHOST
    })
  },
  data () {
    return {
      imgSrc: require('../../../assets/minihost.svg'),
      appPrefix: '迷你集群',
      createLink: 'mc-up'
    }
  },
  created () {
    this.fetchMh()
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.fr {
  float: right;
}
.result-grid {
    display: flex;
    align-content: stretch;
    display: flex;
    flex-flow: row wrap;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 10px;
    .app-item {
      display: flex;
      flex: 1 0;
      position: relative;
      min-width: 365px;
      max-width: 365px;
      height: 230px;
      border-radius: .2rem;
      background-color: white;
      margin-right: 1rem;
      margin-bottom: 1rem;
      border-color: black;
    }
}
.empty-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
}
</style>
