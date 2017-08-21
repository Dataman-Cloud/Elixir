<template>
  <div class="app-wrapper">
    <Sidebar class="sidebar-container"></Sidebar>
    <section class="main-content">
      <navbar></navbar>
      <App-main/>
    </section>
  </div>
</template>

<script>
import { Navbar, AppMain, Sidebar } from './index'

export default {
  name: 'layout',
  components: {
    Navbar,
    AppMain,
    Sidebar
  }
}
</script>

<style scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}

.sidebar-container {
  width: 180px;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow-y: auto;
}

.bread-header {
  width: 100%;
  height: 50px;
  line-height: 50px;
}

.main-content {
  min-height: 100%;
  margin-left: 180px;
}
</style>
