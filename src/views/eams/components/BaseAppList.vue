<template>
  <div class="">
    <div class="">
      <router-link :to="createLink">
        <el-button type="primary">创建{{appPrefix}}</el-button>
      </router-link>
      <el-button @click="reload" size="small" class="small-reload-btn">
        <span class="glyphicon glyphicon-repeat" aria-hidden="true"></span>
      </el-button>
    </div>
    <div class="result-grid" v-if="List.length">
        <div :span="8" v-for="li in List" :key="li.name" class="app-item">
          <app-card :item="li" :imgSrc="imgSrc"/>
        </div>
    </div>
    <div class="empty-page" v-else>
      <span>
        暂无应用
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AppCard from '@/views/eams/components/AppCard'
import * as easmType from '@/store/eams/mutations_types'

export default {
  name: 'base-app-list',
  components: {
    AppCard
  },
  computed: {
    ...mapGetters({
      List: 'octopusList'
    })
  },
  methods: {
    ...mapActions({
      fetchEams: easmType.FETCH_EAMS
    }),
    reload () {
      this.fetchEams()
    }
  },
  data () {
    return {
      imgSrc: require('../../../assets/octopus.svg'),
      appPrefix: 'app',
      createLink: 'oct-up'
    }
  },
  created () {
    this.fetchEams()
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

.small-reload-btn {
  margin-left: 20px;
}
</style>
