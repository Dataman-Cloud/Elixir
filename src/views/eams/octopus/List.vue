<template>
  <div class="">
    <div class="">
      <router-link to="oct-up">
        <el-button type="primary">创建</el-button>
      </router-link>
    </div>
    <div class="result-grid">
        <div :span="8" v-for="li in octopusList" :key="li.name" class="app-item">
          <app-card :item="li" :imgSrc="imgSrc"/>
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AppCard from '@/views/eams/components/AppCard'
import * as easmType from '@/store/eams/mutations_types'
export default {
  components: {
    AppCard
  },
  computed: {
    ...mapGetters([
      'octopusList'
    ])
  },
  methods: {
    ...mapActions({
      fetchEams: easmType.FETCH_EAMS
    })
  },
  data () {
    return {
      imgSrc: require('../../../assets/octopus.svg')
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
</style>
