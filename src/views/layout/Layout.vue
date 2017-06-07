<template>
  <div class="app-wrapper">
    <header class="bread-header">
      <Breadcrumb/>
    </header>
    <section class="main-content">
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
  .bread-header {
    display: flex;
    width: 100%;
    height: 50px;
    background: #2c867a;
    line-height: 50px;
    align-items: center;
  }

  .main-content{
    padding: 20px;
  }
</style>
