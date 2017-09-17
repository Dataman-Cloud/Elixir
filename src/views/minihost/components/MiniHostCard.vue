<template>
  <el-card :body-style="{width:'300px'}">
      <div class="header-box">
        <img :src="imgSrc" alt="" class="card-img">
        <el-dropdown @command="handleCommand" class="hover">
          <span class="el-dropdown-link">
            选项<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">更新</el-dropdown-item>
            <el-dropdown-item command="b">查看</el-dropdown-item>
            <el-dropdown-item command="c">停止</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <hr>
      <div class="margin--top--10">
        <span class="margin--right--10">状态:</span>
        <status-indicator :status="item.status" />
      </div>
      <div class="margin--top--10">
        <span class="margin--right--10">ip:</span> {{`${item.ip}:${item.ports?item.ports[0]:''}`}}
      </div>
      <div class="margin--top--10">
        <span class="margin--right--10">创建时间:</span> {{item.created | formatTime('{y}-{m}-{d} {h}:{i}:{s}')}}
      </div>
      <div class="margin--top--10">
        <span class="margin--right--10">更新时间:</span> {{item.updated | formatTime('{y}-{m}-{d} {h}:{i}:{s}')}}
      </div>
      <div class="margin--top--10 ">
        <span class="margin--right--10">描述:</span> {{item.desc}}
      </div>
  </el-card>
</template>

<script>
import StatusIndicator from './StatusIndicator.vue'
import * as mhApi from '@/api/minihost'
export default {
  name: 'app-card',
  components: {
    StatusIndicator
  },
  props: {
    item: Object,
    imgSrc: {
      default: require('../../../assets/docker.svg')
    }
  },
  data () {
    return {
      name: 'demo'
    }
  },
  computed: {
    IP () {
      let {item} = this
      if (Array.isArray(item.ports) && item.ports.length > 0) {
        return `${item.ip}:${item.ports[0]}`
      }
      return '-'
    }
  },
  methods: {
    handleCommand (command) {
      this.$message('click on item ' + command)
      mhApi.deleteApps([this.item.id])
    }
  }

}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.card-img {
  height: 30px;
}
.header-box {
  display: flex;
  align-content: space-between;
  justify-content: space-between;
}
.hover {
  cursor: pointer;
}
.margin--top--10 {
  margin-top: 10px;
}
.margin--right--10 {
  margin-right: 10px;
}
</style>
