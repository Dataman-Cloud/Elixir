<template>
  <div class="app-wrapper">
    <section class="main-content">
      <Tabs>
        <App-main/>
      </Tabs>
    </section>
  </div>
</template>

<script>
import { Breadcrumb, AppMain, Tabs } from './index'

export default {
  name: 'layout',
  components: {
    Breadcrumb,
    AppMain,
    Tabs
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

.main-content {
  padding: 20px;
}
</style>
