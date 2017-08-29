<template>
  <el-dialog :title="isUpdate ? '更新策略' : '创建策略'" v-model="dialogVisible" size="small" ref="dialog" @close="close">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <div style="height: 60vh; overflow-y:scroll; overflow-x: hidden" v-scroll="dialogVisible">
        <el-form-item label="应用名称" prop="app_id">
          <el-select v-model="form.app_id" @visible-change="openAppNames" v-if="!isUpdate" v-loading="loading">
            <el-option v-for="appName in appNames" :key="appName.appId" :label="appName.appId" :value="appName.appId"></el-option>
          </el-select>
          <el-input v-model="form.app_id" v-if="isUpdate" disabled></el-input>
        </el-form-item>
        <el-form-item label="告警规则" class="spec">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item prop="type">
                <el-select v-model="form.type">
                  <el-option label="响应时间" value="响应时间"></el-option>
                  <el-option label="CPU使用量" value="CPU使用量"></el-option>
                  <el-option label="容器已用内存" value="容器已用内存"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="operator">
                <el-select v-model="form.operator">
                  <el-option label="大于" value="大于"></el-option>
                  <el-option label="小于" value="小于"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="set_value">
                <el-input type="number" v-model.number="form.set_value" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <span v-if="form.type === '响应时间'">ms</span>
            <span v-if="form.type === 'CPU使用量' || form.type === '容器已用内存'">%</span>
          </el-row>
        </el-form-item>
        <el-form-item label="请求地址" v-if="form.type === '响应时间'" prop="requesturi">
          <el-input v-model="form.requesturi" placeholder="请输入请求地址"></el-input>
        </el-form-item>
        <el-form-item label="监控周期" prop="monitor_cycle">
          <el-input v-model.number="form.monitor_cycle" placeholder="60"></el-input>
        </el-form-item>
        <el-form-item label="阈值" prop="threshold">
          <el-input v-model.number="form.threshold" placeholder="3"></el-input>
        </el-form-item>
        <el-form-item label="激活" prop="status">
          <el-checkbox v-model="form.status">激活</el-checkbox>
        </el-form-item>
        <el-form-item label="扩缩方式" prop="action">
          <el-radio-group v-model="form.action" :disabled="isUpdate">
            <el-radio :label="1">扩</el-radio>
            <el-radio :label="2">缩</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.action === 2" label="最小实例数" prop="min_instance">
          <el-input v-model.number="form.min_instance"></el-input>
        </el-form-item>
        <el-form-item v-if="form.action === 1" label="最大实例数" prop="max_instance">
          <el-input v-model.number="form.max_instance"></el-input>
        </el-form-item>
        <el-form-item label="步长" prop="step">
          <el-input v-model="form.step" placeholder="1"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSubmit('form')" :loading="submitLoading">立即{{isUpdate ? '更新' : '创建'}}
      </el-button>
      <el-button @click="dialogVisible = false">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import * as elasticUtil from '@/views/elastic/services/elastic'
import * as fetchElastic from '@/api/elastic'
import * as type from '@/store/elastic/mutations_types'

export default {
  data () {
    return {
      appNames: [],
      loading: false,
      dialogVisible: false,
      form: this._.merge({}, elasticUtil.ELASTIC_BASE),
      rules: elasticUtil.ELASTIC_FORM_RULES,
      id: null,
      submitLoading: false
    }
  },
  computed: {
    isUpdate: function () {
      return !!this.id
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
    async appNameInitFetch () {
      this.loading = true
      let res = await fetchElastic.getAppName()
      this.loading = false
      return res
    },
    close () {
      this.resetForm()
      this.submitLoading = false
    },
    onSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.submitLoading = true
          this.form.status = this.form.status ? 'start' : 'disable'
          try {
            this.isUpdate ? await fetchElastic.updatePolicy(this.form) : await fetchElastic.createPolicy(this.form)
            this.dialogVisible = false
            this.$store.dispatch(type.FETCH_POLICY)
          } catch (error) {
            this.submitLoading = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    open: function (id) {
      this.id = id
      if (this.isUpdate) {
        this.updateInitFetch(this.id)
          .then(res => this.updateInit(res.policy))
      }
      this.$refs.dialog.open()
    },
    openAppNames (isOpen) {
      return isOpen ? this.appNameInitFetch().then(res => {
        this.appNames = res.data
      }) : null
    },
    resetForm () {
      this.id = null
      this.$refs.form.resetFields()
    },
    updateInitFetch (appId) {
      this.loading = true
      return fetchElastic.getPolicy(appId)
        .then((res) => {
          this.loading = false
          return res
        })
    },
    updateInit (initFetchData) {
      this.form = initFetchData
      this.form.status = (initFetchData.status === 'start')
    }
  }
}
</script>
<style scoped>
.spec .el-row .el-col-6 {
  padding: 0 !important;
  margin-right: 20px;
}

.healthCheck .el-row .el-col {
  margin-bottom: 20px;
  padding: 0 !important;
  margin-right: 20px;
}

.advance {
  margin-bottom: 20px;
}
</style>
