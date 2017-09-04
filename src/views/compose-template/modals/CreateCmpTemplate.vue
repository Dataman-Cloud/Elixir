<template>
  <el-dialog title="创建模板" v-model="dialogVisible" size="small" ref="dialog" @close="close">
    <el-form ref="form" :model="form" :rules="rules" style="overflow-y: scroll; overflow-x: hidden;" v-scroll="dialogVisible">
      <el-form-item label="模板名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="YAML" prop="yaml">
        <el-row>
          <el-col :span="24">
            <yaml-editor v-model="form.yaml" :editorOption="{mode: 'text/x-yaml', lint: false}"></yaml-editor>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer left-space">
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button @click="dialogVisible = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import * as type from '@/store/compose-template/mutations_types'
import * as api from '@/api/compose-template'
import { YAML_BASE } from '@/views/compose-template/services/template'
import yamlEditor from '@/components/codeEditor'

export default {
  components: { yamlEditor },
  data () {
    return {
      dialogVisible: false,
      isUpdate: false,
      submitLoading: false,
      form: {
        name: '',
        desc: '',
        yaml: YAML_BASE
      },
      rules: {
        name: [
          { required: true, message: '名称不能为空' }
        ],
        yaml: [
          { required: true, message: 'YAML 不能为空' }
        ]
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
    close: function () { },
    open: function () {
      this.form.yaml = YAML_BASE
      this.$refs.dialog.open()
    },
    onSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            await api.createTemplate(this.form)
            this.dialogVisible = false
            this.$store.dispatch(type.FETCH_COMPOSE_TEMPLATES)
          } catch (error) {
            this.submitLoading = false
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

<style scoped>
.el-form-item__content {
  font-size: 14px;
}

.left-space {
  margin-left: 50px;
}
</style>
