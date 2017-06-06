<template>
    <div class="app-wrapper">
        <div class="main-container">
            <Breadcrumb/>
            <App-main/>
        </div>
    </div>
</template>

<script>
    import { Breadcrumb, AppMain } from './index'

    export default {
      name: 'layout',
      components: {
        Breadcrumb,
        AppMain
      }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
