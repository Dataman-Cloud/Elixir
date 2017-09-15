<template>
  <el-dialog title="创建编排" v-model="dialogVisible" size="small" ref="dialog" @close="close">
    <el-form ref="form" :model="form" :rules="rules" style="overflow-y:scroll; overflow-x: hidden;" label-width="80px" v-scroll="dialogVisible">
      <el-form-item label="编排名称" prop="name">
        <el-input v-model="form.name" placeholder="请填写编排名称"></el-input>
      </el-form-item>
      <el-form-item label="选择集群" prop="cluster">
        <el-select @visible-change="selectCluster" v-model="form.cluster">
          <el-option v-for="(cluster,index) in clusters" :key="index" :value="cluster.clusterLabel" :label="cluster.clusterLabel"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="runas" prop="runas">
        <el-input v-model="form.runas" placeholder="请填写runas"></el-input>
      </el-form-item>

      <el-form-item label="labels">
        <el-button type="primary" size="small" @click="addLabel">添加label</el-button>
      </el-form-item>

      <el-form-item v-for="(label, index) in form.labelsTmp" :key="index" class="wrapContainerRow">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item :prop="'labelsTmp.' + index + '.key'" :key="index" :rules="[{ required: true, message: 'LABEL 的 KEY 值不能为空' }]">
              <el-input v-model="label.key">
                <template slot="prepend">KEY</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item :prop="'labelsTmp.' + index + '.value'" :key="index" :rules="[{ required: true, message: 'LABEL 的 VALUE 值不能为空' }]">
              <el-input v-model="label.value">
                <template slot="prepend">VALUE</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-button @click.prevent="removeLabel(index)">
            <i class="el-icon-delete"></i>
          </el-button>
        </el-row>
      </el-form-item>

      <el-form-item label="envs">
        <el-button type="primary" size="small" @click="addEnv">添加env</el-button>
      </el-form-item>

      <el-form-item v-for="(env, index) in form.envsTmp" :key="index" class="wrapContainerRow">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item :prop="'envsTmp.' + index + '.key'" :key="index" :rules="[{ required: true, message: 'ENV 的 KEY 值不能为空' }]">
              <el-input v-model="env.key">
                <template slot="prepend">KEY</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item :prop="'envsTmp.' + index + '.value'" :key="index" :rules="[{ required: true, message: 'ENV 的 VALUE 值不能为空' }]">
              <el-input v-model="env.value">
                <template slot="prepend">VALUE</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-button @click.prevent="removeEnv(index)">
            <i class="el-icon-delete"></i>
          </el-button>
        </el-row>
      </el-form-item>

      <el-form-item label="yamlText" prop="yamlText">
        <json-editor v-model="form.yamlText" :editorOption="{mode: 'text/x-yaml', lint: false}"></json-editor>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer left-space">
      <el-button type="primary" @click="onSubmit" :loading="submitLoading">立即创建</el-button>
      <el-button @click="dialogVisible = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import * as type from '@/store/compose/mutations_types'
import * as compose from '@/api/compose'
import * as cluster from '@/api/cluster'
import { COMPOSE_BASE } from '@/views/compose/services/composeTemplate'
import jsonEditor from '@/components/codeEditor'

export default {
  components: { jsonEditor },
  data () {
    return {
      dialogVisible: false,
      isUpdate: false,
      submitLoading: false,
      clusters: [],
      form: {
        name: '',
        cluster: '',
        labels: {},
        envs: {},
        labelsTmp: [],
        envsTmp: [],
        runas: '',
        yamlText: COMPOSE_BASE
      },
      rules: {
        name: [
          { required: true, message: '编排名称不能为空' }
        ],
        cluster: [
          { required: true, message: '请选择集群' }
        ],
        runas: [
          { required: true, message: 'runas 不能为空' }
        ],
        yamlText: [
          { required: true, message: 'yamlText 不能为空' }
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
    close: function () {
      this.resetForm()
      this.submitLoading = false
    },
    open: function () {
      this.form.yamlText = COMPOSE_BASE
      this.$refs.dialog.open()
    },
    addLabel () {
      let labelInfo = {
        key: '',
        value: ''
      }
      this.form.labelsTmp.push(labelInfo)
    },
    addEnv () {
      let envInfo = {
        key: '',
        value: ''
      }
      this.form.envsTmp.push(envInfo)
    },
    onSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.form.labels = this.transformLabelstoObj(this.form.labelsTmp)
          this.form.envs = this.transformEnvstoObj(this.form.envsTmp)
          try {
            await compose.createCompose(this.form)
            this.dialogVisible = false
            this.$store.dispatch(type.FETCH_COMPOSES)
          } catch (error) {
            this.submitLoading = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    removeLabel (index) {
      this.form.labelsTmp.splice(index, 1)
    },
    removeEnv (index) {
      this.form.envsTmp.splice(index, 1)
    },
    resetForm () {
      this.id = null
      this.$refs.form.resetFields()
    },
    async selectCluster (flag) {
      if (flag) {
        let { data } = await cluster.clusterList()
        this.clusters = data
      }
    },
    transformLabelstoObj (labels = []) {
      return labels.reduce((label, val) => {
        label[val.key] = val.value
        return label
      }, {})
    },
    transformEnvstoObj (envs = []) {
      return envs.reduce((env, val) => {
        env[val.key] = val.value
        return env
      }, {})
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
