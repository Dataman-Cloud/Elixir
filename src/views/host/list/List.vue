<template>
  <div>
    <el-table stripe :data="hostList" border tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="ip" label="主机" show-overflow-tooltip>
        </el-table-column>
      </el-table>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import * as type from '@/store/host/mutations_types'

export default {
  data () {
    return {
      listLoading: false
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
      listHosts: type.FETCH_HOSTS
    }),
    async listCluster () {
      this.listLoading = true
      try {
        await this.listHosts()
      } finally {
        this.listLoading = false
      }
    }
  },
  mounted () {
    this.listCluster()
  }
}
</script>
