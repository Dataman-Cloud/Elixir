<template>
  <el-dialog title="添加主机" v-model="dialogVisible" size="tiny" ref="dialog">
    <div>
      编辑集群
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
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
