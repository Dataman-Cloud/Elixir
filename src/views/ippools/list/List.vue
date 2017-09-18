<template>
  <div>
    <div class="btn-group">
      <span>
        <el-button type="primary" @click="reload">
          <i class="glyphicon glyphicon-repeat"></i>
        </el-button>
        <el-button type="primary" @click="openCreate">
          <i class="ion-ios-plus-outline"></i> 创建IP 池
        </el-button>
      </span>
      <el-button-group style="display: flex">
        <el-input class="el-input-search" icon="search" v-model="searchWord" placeholder="请输入内容"></el-input>
      </el-button-group>
    </div>

    <Create-Dialog ref="CreateDialog" @close="reload"></Create-Dialog>

    <el-table ref="ippoolsTable" :data="filterIpPools" border tooltip-effect="dark" style="width: 100%" v-loading="listLoading">
      <el-table-column prop="id" label="id">
      </el-table-column>
      <el-table-column prop="cidr" label="cidr">
      </el-table-column>
      <el-table-column prop="ip_start" label="ip_start">
      </el-table-column>
      <el-table-column prop="ip_end" label="ip_end">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as type from '@/store/ip-pools/mutations_types'
import CreateDialog from '@/views/ippools/modals/CreateDialog'
import jsonEditor from '@/components/codeEditor'

export default {
  components: {
    CreateDialog,
    jsonEditor
  },
  data () {
    return {
      listLoading: false,
      searchWord: ''
    }
  },
  computed: {
    ...mapState({
      ipPoolsList (state) {
        return state.ipPools.ipPools.ipPools
      }
    }),
    filterIpPools: function () {
      let poolsList = this.transformObjToArr(this.ipPoolsList)
      return this.searchWord ? poolsList.filter(pools => pools.id.includes(this.searchWord)) : poolsList
    }
  },
  methods: {
    ...mapActions({
      fetchIpPools: type.FETCH_IPPOOLS
    }),
    async listIpPools () {
      this.listLoading = true
      await this.fetchIpPools()
        .then(() => (this.listLoading = false))
        .catch(() => (this.listLoading = false))
    },
    openCreate () {
      this.$refs.CreateDialog.open()
    },
    reload () {
      this.listIpPools()
    },
    transformObjToArr (obj) {
      var arr = []
      for (var i in obj) {
        arr.push(obj[i].subnet)
      }
      return arr
    }
  },
  mounted () {
    this.listIpPools()
  }
}
</script>
<style scope>

</style>

