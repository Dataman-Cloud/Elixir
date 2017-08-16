<template>
  <el-dialog title="权重" v-model="dialogVisible" size="small" ref="dialog" @close="close">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="权重" prop="value">
        <div class="block">
          <el-slider v-model.number="form.value" show-input :max="1" :step="0.1"></el-slider>
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button @click="onSubmit" :loading="submitLoading">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import * as fetch from '@/api/app'
import * as type from '@/store/app/mutations_types'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      id: null,
      submitLoading: false,
      dialogVisible: false,
      form: {
        value: 0
      }
    }
  },
  methods: {
    ...mapActions({
      fetchApps: type.FETCH_APPS
    }),
    close () {
      this.resetForm()
      this.submitLoading = false
    },
    open: function (id) {
      this.id = id
      this.$refs.dialog.open()
    },
    onSubmit: function () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.submitLoading = true
          try {
            await fetch.changeWeight(this.id, this.form)
            this.dialogVisible = false
            this.fetchApps()
          } catch (error) {
            this.submitLoading = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm: function () {
      this.$refs.form.resetFields()
    }
  }
}
</script>
