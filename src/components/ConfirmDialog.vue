<template>
  <el-dialog title="提示" v-model="dialogVisible" size="tiny" ref="dialog">
    <span>{{msg}}</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirm()">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        dialogVisible: false,
        msg: ''
      }
    },
    methods: {
      open: function (msg = '') {
        this.msg = msg
        this.$refs.dialog.open()
      },
      confirm: function () {
        this.$emit('ok', this.form)
        this.dialogVisible = false
      }
    }
  }
</script>
