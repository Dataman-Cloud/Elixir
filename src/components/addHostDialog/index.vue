<template>
  <el-dialog title="添加主机" v-model="dialogVisible" size="small" ref="dialog">
    <div>
      <el-transfer v-model="rightHosts" :data="hostList" :titles="['选择主机','已选主机']"></el-transfer>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addHost" :disabled="rightHosts.length === 0">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,
      rightHosts: []
    }
  },
  props: {
    hostList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    open: function () {
      this.$refs.dialog.open()
      this.rightHosts = []
    },
    async addHost () {
      await this.$emit('close', this.rightHosts)
      this.dialogVisible = false
    }
  }
}
</script>
