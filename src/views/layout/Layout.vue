<template>
  <div class="app-wrapper">
    <Sidebar class="sidebar-container"></Sidebar>
    <section :class="[isCollapse ? 'main-content-collapse' : 'main-content']">
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
  },
  computed: {
    isCollapse () {
      return this.$store.state.user.isCollapse
    }
  }
}
</script>

<style scoped>
.sidebar-container {
  transition: width 0.28s ease-out;
  height: 100%;
  position: fixed;
  left: 0;
  z-index: 1001;
}

.main-content {
  transition: margin-left 0.28s ease-out;
  min-height: 100%;
  margin-left: 160px;
}

.main-content-collapse {
  transition: margin-left 0.28s ease-out;
  min-height: 100%;
  margin-left: 60px;
}
</style>
