<template>
  <div class="debug-content">
    <ul class="debug-table" v-if="taskFailure">
      <li v-for="(value, key) in taskFailure[0]" :key="key">
        <div>
          <span>{{key}}</span>
        </div>
        <div>
          <span>{{value}}</span>
        </div>
      </li>
    </ul>
    <span v-else>暂无信息</span>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapState({
      taskFailure ({app}) {
        return app.app.taskFailure
      }
    })
  }
}
</script>
<style scoped>
.debug-content>span {
  display: inline-block;
  width: 100%;
  text-align: center;
}

.debug-table {
  display: flex;
  flex-direction: column;
  list-style: none;
}

.debug-table li {
  border: 1px solid #eeeeee;
  display: flex;
  align-items: center;
  min-height: 50px;
}

.debug-table li:not(:last-child) {
  border-bottom: none;
}

.debug-table li div:last-child {
  border-left: 1px solid #eeeeee;
}

.debug-table li div {
  flex: 0 0 50%;
}

.debug-table li span {
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: 20px;
  text-align: center;
  word-break: break-all;
  box-sizing: border-box;
}
</style>
