<template>
  <el-dialog title="创建编排" v-model="dialogVisible" size="small" ref="dialog" @close="dialogVisible = false">
    <div style="height: 60vh; overflow-y:scroll; overflow-x: hidden;" v-scroll="dialogVisible">
      <el-form ref="form" :model="form">
        <div class="components-container" style="margin-bottom:20px;">
          <div class="editor-container">
            <json-editor ref="jsonEditor" v-model="form.composeStr"></json-editor>
          </div>
        </div>

        <el-form-item style="margin-left:30px;">
          <el-button type="primary" @click="onSubmit">立即创建
          </el-button>
          <el-button type="primary" @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import jsonEditor from '@/components/jsonEditor'
import * as type from '@/store/app/mutations_types'
import * as fetchCompose from '@/api/app-swan'
import * as composeUtil from '@/views/app/services/composeTemplate'

export default {
  components: { jsonEditor },
  data () {
    return {
      dialogVisible: false,
      isUpdate: false,
      submitLoading: false,
      form: {
        composeStr: this._.merge({}, composeUtil.COMPOSE_BASE)
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
      this.$refs.dialog.open()
    },
    onSubmit () {
      this.$refs.form.validate((valid) => {
        fetchCompose.createCompose(JSON.parse(this.form.composeStr))
          .then(() => {
            this.$store.dispatch(type.FETCH_COMPOSES)
            this.dialogVisible = false
          })
          .catch(() => {
            this.submitLoading = false
          })
      })
    }
  }
}
</script>

<style scoped>

</style>

