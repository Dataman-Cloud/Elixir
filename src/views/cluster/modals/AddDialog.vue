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
import * as host from '@/api/host'
import * as hostType from '@/store/host/mutations_types'
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      dialogVisible: false,
      checkedHost: [],
      name: ''
    }
  },
  computed: {
    ...mapState({
      hostList (state) {
        return state.host.hosts.hosts
      }
    })
  },
  methods: {
    ...mapActions({
      getHosts: hostType.FETCH_HOSTS
    }),
    transformHosts (hosts = []) {
      return hosts.map((item, i) => {
        if (this.checkedHost.indexOf(i) !== -1) {
          return item.label
        }
      })
    },
    open: function (name) {
      this.$refs.dialog.open()
      this.getHosts()
      this.name = name
      this.checkedHost = []
    },
    async addHost () {
      const checkedIps = this.transformHosts(this.hostList)
      await host.addHost(this.name, checkedIps)
      this.dialogVisible = false
      this.$emit('close')
      this.$notify({ message: '添加成功' })
    }
  }
}
</script>

,
