<template>
  <el-card>
      <div class="header-box">
        <img :src="item.name | imgSrc" alt="" class="card-img">
        <el-dropdown @command="handleCommand" class="hover">
          <span class="el-dropdown-link">
            选项<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">黄金糕</el-dropdown-item>
            <el-dropdown-item command="b">狮子头</el-dropdown-item>
            <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
            <el-dropdown-item command="d" disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item command="e" divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <hr>
      <el-form label-position="left" inline class="demo-table-expand">
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称">
              <span>{{name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名称">
              <span>{{name}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称">
              <span>{{name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名称">
              <span>{{name}}</span>
            </el-form-item>
          </el-col>
        </el-row>

          <el-form-item label="状态">
            <span>{{item.op_status ? item.op_status : '-'}}</span>
          </el-form-item>
          <el-form-item label="服务名">
            <span>{{name}}</span>
          </el-form-item>
          <el-form-item label="服务名">
            <span>{{name}}</span>
          </el-form-item>
          <el-form-item label="服务名">
            <span>{{name}}</span>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'app-card',
  props: {
    item: Object
  },
  data () {
    return {
      name: 'demo'
    }
  },
  filters: {
    imgSrc (name) {
      let src = require('../../../assets/docker.svg')
      if (/-/.test(name)) {
        const names = name.split('-')
        if (names.length > 0) {
          const appNamePrefix = names[0]
          switch (appNamePrefix) {
            case 'octopus':
              src = require('../../../assets/octopus.svg')
              break
            case 'squid':
              src = require('../../../assets/squid.svg')
              break
            default:
              src = require('../../../assets/docker.svg')
          }
        }
      }
      return src
    }
  },
  methods: {
    handleCommand (command) {
      this.$message('click on item ' + command)
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
</style>
