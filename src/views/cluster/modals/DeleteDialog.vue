<template>
  <el-dialog title="删除" v-model="dialogVisible" size="tiny" ref="dialog">
    <div>
      删除集群
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
  methods: {
    open: function () {
      this.$refs.dialog.open()
    }
  }
}
</script>
