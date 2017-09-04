<template>
  <el-dialog title="添加主机" v-model="dialogVisible" size="small" ref="dialog">
    <div>
      <el-transfer v-model="checkedHost" :data="data" :titles="['选择主机','已选主机']"></el-transfer>
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
      data: [],
      checkedHost: [],
      name: ''
    }
  },
  computed: {
    ...mapState({
      datas (state) {
        return state.host.hosts.hosts
      }
    })
  },
  methods: {
    ...mapActions({
      getdata: hostType.FETCH_HOST
    }),
    open: function (name) {
      this.$refs.dialog.open()
      this.getdata()
      this.name = name
      this.data = []
      this.checkedHost = []
    },
    addHost () {
      this.dialogVisible = false
      const checkedIp = []
      this.datas.forEach((item, i) => {
        if (this.checkedHost.indexOf(i) !== -1) {
          checkedIp.push(item)
        }
      })
      host.addHost(this.name, checkedIp)
    }
  },
  watch: {
    datas (news, old) {
      this.data = []
      this.datas.forEach((item, index) => {
        this.data.push({
          key: index,
          label: `主机${item}`
        })
      })
    }
  }
}
</script>

