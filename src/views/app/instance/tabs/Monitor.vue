<template>
  <div class="chart-container" style="height: 100vh;">
    <line-chart id="cpu" height='50%' width='50%' :legend="['移动', '电信', '联通']"/>
    <line-chart id="mem" height='50%' width='50%' :legend="['移动', '电信', '联通']"/>
    <line-chart id="net" height='50%' width='50%' :legend="['移动']"/>
    <line-chart id="disk" height='50%' width='50%' :legend="['移动', '电信', '联通']"/>
  </div>
</template>
<script>
  import LineChart from '@/components/charts/Line'

  export default {
    components: {LineChart},
    data () {
      return {}
    },
    computed: {},
    methods: {}
  }
</script>
<style scoped>
  .chart-container {
    display: flex;
    flex-wrap: wrap;
  }
</style>
