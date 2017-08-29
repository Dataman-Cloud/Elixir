<template>
  <el-dialog title="创建编排" v-model="dialogVisible" size="small" ref="dialog" @close="close">
      <el-form ref="form" :model="form" style="height: 60vh; overflow-y:scroll; overflow-x: hidden;" v-scroll="dialogVisible">
        <el-form-item prop="composeStr">
          <json-editor ref="jsonEditor" v-model="form.composeStr"></json-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer left-space">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </div>
  </el-dialog>
</template>

<script>
import jsonEditor from '@/components/jsonEditor'
import * as type from '@/store/compose/mutations_types'
import * as compose from '@/api/compose'
import { COMPOSE_BASE } from '@/views/compose/services/composeTemplate'

export default {
  components: { jsonEditor },
  data () {
    return {
      dialogVisible: false,
      isUpdate: false,
      submitLoading: false,
      form: {
        composeStr: this._.merge({}, COMPOSE_BASE)
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
    close: function () {
      this.$refs.form.resetFields()
    },
    open: function () {
      this.$refs.dialog.open()
    },
    onSubmit () {
      this.$refs.form.validate(async (valid) => {
        try {
          await compose.createCompose(JSON.parse(this.form.composeStr))
          this.dialogVisible = false
          this.$store.dispatch(type.FETCH_COMPOSES)
        } catch (error) {
          this.submitLoading = false
        }
      })
    }
  }
}
</script>

<style scoped>
.el-form-item__content {
  font-size: 14px;
}
.left-space{
  margin-left: 50px;
}
</style>
