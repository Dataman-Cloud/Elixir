<template>
  <el-dialog title="提示信息" v-model="dialogVisible" size="tiny" ref="dialog">
    <div>该集群中有<span v-if="cluster.machineNum>0">主机{{cluster.machineNum}}台</span><span v-if="cluster.appNum>0">,应用{{cluster.appNum}}个</span>
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
      dialogVisible: false,
      cluster: {}
    }
  },
  methods: {
    open: function (cluster) {
      this.$refs.dialog.open()
      this.cluster = cluster
    }
  }
}
</script>
