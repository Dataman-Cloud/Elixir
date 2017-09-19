<template>
  <el-dialog v-model="dialogVisible" size="small" ref="dialog" @close="close">
    <el-form :model="form" ref="form" label-width="100px" :rules="rules">
      <div style="overflow-y:scroll; overflow-x: hidden;" v-scroll="dialogVisible">
        <el-form-item label="cidr" prop="cidr">
          <el-input v-model="form.cidr"></el-input>
        </el-form-item>
        <el-form-item label="subnetsName" prop="subnetsName">
          <el-input v-model="form.subnetsName"></el-input>
        </el-form-item>
        <el-form-item label="gateway" prop="gateway">
          <el-input v-model="form.gateway"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm" :loading="submitLoading">立即添加</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import * as type from '@/store/networks/mutations_types'
import * as networks from '@/api/networks'

export default {
  data () {
    return {
      dialogVisible: false,
      form: {
        cidr: '',
        subnetsName: '',
        gateway: ''
      },
      rules: {
        cidr: [
          { required: true }
        ],
        subnetsName: [
          { required: true }
        ],
        gateway: [
          { required: true }
        ]
      },
      submitLoading: false
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
    ...mapActions({
      fetchNetworks: type.FETCH_NETWORKS
    }),
    async open () {
      this.$refs.dialog.open()
    },
    close () {
      this.resetForm()
      this.submitLoading = false
    },
    resetForm () {
      this.$refs.form.resetFields()
    },
    submitForm () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.submitLoading = true
          try {
            await networks.addNetworks(this.form)
            this.$notify({ message: '添加成功' })
          } catch (error) {
            this.submitLoading = false
          } finally {
            this.dialogVisible = false
            this.fetchNetworks()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
