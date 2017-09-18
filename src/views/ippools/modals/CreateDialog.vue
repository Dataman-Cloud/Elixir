<template>
  <el-dialog title="创建IP 池" v-model="dialogVisible" size="small" ref="dialog">
      <el-form ref="form" :model="form" style="overflow-y:scroll; overflow-x: hidden;" v-scroll="dialogVisible">
        <el-form-item prop="ipPoolsStr">
          <json-editor v-model="form.ipPoolsStr"></json-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer left-space">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </div>
  </el-dialog>
</template>

<script>
// import * as type from '@/store/ip-pools/mutations_types'
import * as ipPools from '@/api/ip-pools'
import { IPPOOLS_BASE } from '@/views/ippools/services/ippoolsTemplate'
import jsonEditor from '@/components/codeEditor'

export default {
  components: { jsonEditor },
  data () {
    return {
      dialogVisible: false,
      submitLoading: false,
      form: {
        ipPoolsStr: JSON.stringify(IPPOOLS_BASE, null, 2)
      }
    }
  },
  directives: {
    scroll: function (el, bind) {
      if (!bind.value) {
        el.scrollTop = 0
      }
    }
  },
  methods: {
    open: function () {
      this.form.ipPoolsStr = JSON.stringify(IPPOOLS_BASE, null, 2)
      this.$refs.dialog.open()
    },
    onSubmit () {
      this.$refs.form.validate(async (valid) => {
        try {
          await ipPools.createIpPools(JSON.parse(this.form.ipPoolsStr))
          this.dialogVisible = false
          this.$emit('close')
        } catch (error) {
          this.submitLoading = false
        }
      })
    }
  }
}
</script>

<style scoped>
.left-space{
  margin-left: 50px;
}
</style>
