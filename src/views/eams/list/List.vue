<template>
  <div class="result-grid">
      <div :span="8" v-for="li in list" :key="li.name" class="app-item">
        <app-card :item="li"/>
      </div>
  </div>
</template>

<script>
import AppCard from '../components/AppCard'
export default {
  components: {
    AppCard
  },
  data () {
    return {
      list: [
        {name: 'octopus-demo'},
        {name: 'squid-demo'},
        {name: 'other-demo'},
        {name: 'other-demo'},
        {
          created_at: '2017-08-22T07:56:47.552295306Z',
          desc: 'demo blog instance: wordpress + mariadb',
          display_name: 'hftest.bbk.dataman191',
          errmsg: 'launch compose tasks 0.db.hftest.bbk.dataman191 error: launch task failed',
          id: '06df6416e6f6c46b',
          name: 'other-demo1',
          op_status: 'noop',
          updated_at: '2017-08-22T07:56:47.71964445Z',
          yaml_env: {HOSTNAME: 'damn', WORKDIR: '/bbklab'}
        },
        {
          created_at: '2017-08-22T07:56:47.552295306Z',
          desc: 'demo blog instance: wordpress + mariadb',
          display_name: 'hftest.bbk.dataman191',
          errmsg: 'launch compose tasks 0.db.hftest.bbk.dataman191 error: launch task failed',
          id: '06df6416e6f6c46b',
          name: 'other-demo2',
          op_status: 'noop',
          updated_at: '2017-08-22T07:56:47.71964445Z',
          yaml_env: {HOSTNAME: 'damn', WORKDIR: '/bbklab'}
        }
      ]
    }
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
