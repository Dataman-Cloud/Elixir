<template>
  <el-dialog title="创建集群" v-model="dialogVisible" size="tiny" ref="dialog">
    <div>
      创建集群
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary">确 定</el-button>
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
