<template>
  <div>
    <el-table stripe :data="hostList" border tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="label" label="主机" show-overflow-tooltip>
        </el-table-column>
      </el-table>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import * as type from '@/store/host/mutations_types'
import * as tenant from '@/store/tenant/mutations_types'
export default {
  data () {
    return {
      listLoading: false
    }
  },
  computed: {
    ...mapState({
      hostList (state) {
        return this.isPlatform ? state.tenant.hosts.hosts : state.host.hosts.hosts
      }
    }),
    ...mapGetters([
      'isPlatform'
    ])
  },
  methods: {
    ...mapActions({
      getHosts: type.FETCH_HOSTS,
      tenantHosts: tenant.FETCH_TENANT_HOSTS
    }),
    async listCluster () {
      this.listLoading = true
      try {
        this.isPlatform ? await this.tenantHosts() : await this.getHosts()
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
