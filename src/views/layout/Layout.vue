<template>
  <div class="app-wrapper">
    <header class="bread-header">
      <Breadcrumb/>
    </header>
    <section>
      <App-main/>
    </section>
  </div>
</template>

<script>
  import {Breadcrumb, AppMain} from './index'

  export default {
    name: 'layout',
    components: {
      Breadcrumb,
      AppMain
    }
  }
</script>
<style scoped>

</style>
