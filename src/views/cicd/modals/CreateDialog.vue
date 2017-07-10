<template>
  <el-dialog title="新建项目" v-model="dialogVisible" size="small" ref="dialog" @close="close">
    <div style="width: 37vw; height: 60vh; overflow-y:scroll; overflow-x: hidden" v-scroll="dialogVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="项目名称">
          <el-input v-model="form.name" placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <el-form-item label="代码地址">
          <el-input v-model="form.region"></el-input>
        </el-form-item>
        <el-form-item label="项目说明">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="自动构建">
          <el-radio-group v-model="form.resource">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="触发规则">
          <el-radio-group v-model="form.resource">
            <el-radio label="Tag更新"></el-radio>
            <el-radio label="Branch更新"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="网络模式">
          <el-radio-group v-model="form.type">
            <el-radio label="网桥模式"></el-radio>
            <el-radio label="HOST 模式"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="构建文件">
          <el-input type="textarea" v-model="form.file"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>

  export default {
    data () {
      return {
        dialogVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          file: ''
        }
      }
    },
    computed: {
      activeCollapse: function () {
        return this.isUpdate ? 'advance' : ''
      }
    },
    directives: {
      scroll: function (el, bind) {
        if (!bind.value) {
          el.scrollTop = 0
        }
      }
    },
    methods: {
      close () {
        this.dialogVisible = false
      },
      open: function () {
        this.$refs.dialog.open()
      }
    }
  }
</script>
<style scoped>
  .spec .el-row .el-col-6 {
    padding: 0 !important;
    margin-right: 20px;
  }

  .healthCheck .el-row .el-col {
    margin-bottom: 20px;
    padding: 0 !important;
    margin-right: 20px;
  }

  .advance {
    margin-bottom: 20px;
  }
</style>
