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
import * as tenant from '@/api/tenant'
import * as tenantType from '@/store/tenant/mutations_types'
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      checkedHost: [],
      dialogVisible: false,
      name: '',
      tenantId: -1
    }
  },
  computed: {
    ...mapState({
      hostList (state) {
        return state.tenant.hosts.hosts
      }
    })
  },
  methods: {
    ...mapActions({
      getHosts: tenantType.FETCH_HOSTS
    }),
    async addHost () {
      const checkedIps = this.transformHosts(this.hostList)
      await tenant.addHost(checkedIps)
      this.dialogVisible = false
      this.$emit('close')
      this.$notify({ message: '添加成功' })
    },
    open: function (name, tenantId) {
      this.$refs.dialog.open()
      this.getHosts()
      this.name = name
      this.checkedHost = []
      if (tenantId) {
        this.tenantId = tenantId
      }
    },
    transformHosts (hosts = []) {
      return hosts.map((item, i) => {
        if (this.checkedHost.indexOf(i) !== -1) {
          return {
            'ip': item.label,
            'tenantId': this.tenantId
          }
        }
      })
    }
  }
}
</script>
