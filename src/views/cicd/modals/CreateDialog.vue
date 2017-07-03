<template>
  <el-dialog title="新建项目" v-model="dialogVisible" size="small" ref="dialog" @close="close">
    <div style="width: 37vw; height: 60vh; overflow-y:scroll; overflow-x: hidden" v-scroll="dialogVisible">

    </div>
  </el-dialog>
</template>
<script>

  export default {
    data () {
      return {
        dialogVisible: false
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
