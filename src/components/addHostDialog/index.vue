<template>
  <el-dialog title="添加主机" v-model="dialogVisible" size="small" ref="dialog">
    <div>
      <el-transfer v-model="checkedHost" :data="hostList" :titles="['选择主机','已选主机']"></el-transfer>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addHost" :disabled="checkedHost.length == 0">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,
      checkedHost: []
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
    transformHosts (hosts = []) {
      return hosts.map((item, i) => {
        if (this.checkedHost.indexOf(i) !== -1) {
          return item.label
        }
      })
    },
    open: function () {
      this.$refs.dialog.open()
      this.checkedHost = []
    },
    async addHost () {
      await this.$emit('close', this.checkedHost)
      this.dialogVisible = false
    }
  }
}
</script>
