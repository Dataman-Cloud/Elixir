<template>
  <div class="">
    <el-row :gutter="12">
      <el-col :span="12">
        <el-form ref="mcForm" :model="form" :rules="rules" label-width="150px" element-loading-text="数据加载中...">
          <!-- 主机名称 -->
          <el-form-item label="主机名称" prop="serviceName">
            <el-input v-model="form.serviceName">
              <template slot="prepend">minihost-</template>
            </el-input>
          </el-form-item>

          <!-- 实例模式 -->
          <el-form-item label="实例模式" prop="instanceMode">
            <el-radio-group v-model="form.instanceMode">
              <el-tooltip class="item" effect="dark" content="单机模式" placement="top-start">
                <el-radio label="local">单机模式</el-radio>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="集群模式" placement="top-start">
                <el-radio label="cluster">集群模式</el-radio>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="自定义模式" placement="top-start">
                <el-radio label="custom">自定义</el-radio>
              </el-tooltip>
            </el-radio-group>
            <el-input type="number" prop="instanceNumber" v-model.number="form.instanceNumber" :rules="[{ type: 'integer', min: 1, message: '实例个数必须为正整数' }]" v-if="form.instanceMode === 'custom'">
              <template slot="prepend">实例个数</template>
            </el-input>
          </el-form-item>
          </el-form-item>

          <!-- 服务器规格配置 -->
          <el-form-item label="服务器规格配置" prop="containerSizeMode">
            <el-radio-group v-model="form.containerSizeMode">
              <el-tooltip class="item" effect="dark" content="1核1G" placement="top-start">
                <el-radio label="low">基础配置</el-radio>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="2核2G" placement="top-start">
                <el-radio label="medium">中等配置</el-radio>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="4核4G" placement="top-start">
                <el-radio label="high">高级配置</el-radio>
              </el-tooltip>
            </el-radio-group>
          </el-form-item>

          <!-- SSH证书 -->
          <el-form-item label="SSH证书">
            <el-tooltip class="item" effect="dark" content="最多添加3个证书" placement="top-start">
              <el-button type="primary" size="small" @click="addRSA()" :disabled="canAddSsh">添加 SSH证书</el-button>
            </el-tooltip>
          </el-form-item>
          <el-form-item v-for="(ssh, index) in form.ssh" :key="index" class="parameters">
            <el-row :gutter="12">
              <el-col :span="20">
                <el-form-item :prop="'ssh.' + index" :rules="[{ required: true, message: 'KEY 不能为空' },{ pattern: /^[^\u4e00-\u9fa5]*$/, message: 'KEY 不能包含中文' }]">
                  <el-input v-model="ssh[index]" type="textarea">
                    <template slot="prepend">ssh</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-button @click.prevent="removeConfig(index)" :disabled="sshDelete">
                <i class="el-icon-delete"></i>
              </el-button>
            </el-row>
          </el-form-item>

          <!-- 镜像 -->
          <el-form-item label="镜像" prop="image">
            <el-row :gutter="8">
              <el-col :span="12">
                <el-select ref="registryCatalogSel" v-model="form.image.Image" @change="changeImageFront">
                  <el-option v-for="(image, index) in imagesFront" :key="index" :label="repository"
                             :value="image"></el-option>
                </el-select>
              </el-col>
              <el-col :span="9">
                <el-select ref="registryCatalogTagSel" v-model="form.image.tag">
                  <el-option v-for="(tag, index) in tagsFront" :key="index" :label="tag" :value="tag"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>


          <el-collapse>
            <el-collapse-item title="高级选项" name="1">
              <!-- 服务名称 -->
              <el-row :gutter="8">
                <el-col :span="10">
                  <el-form-item label="GPU" :prop="'gpu'" :rules="[{ type: 'integer', min: 1, message: '宽限时间为正整数' }]">
                    <el-input type="number" v-model.number="form.gpu">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item :prop="'gpu'" label="磁盘规格配置(G)" :rules="[{ type: 'integer', min: 1, message: '宽限时间为正整数' }]">
                    <el-input type="number" v-model.number="form.gpu">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="端口号">
                    <el-tooltip class="item" effect="dark" content="最多添加3个证书" placement="top-start">
                      <el-button type="primary" size="small" @click="addPort()" :disabled="canAddSsh">添加 端口号</el-button>
                    </el-tooltip>
                  </el-form-item>
                  <el-form-item v-for="(port, index) in form.ports" :key="index" class="parameters">
                    <el-row :gutter="12">
                      <el-col :span="20">
                        <el-form-item :prop="'ports.' + index" :rules="[{ required: true, message: 'KEY 不能为空' },{ pattern: /^[^\u4e00-\u9fa5]*$/, message: 'KEY 不能包含中文' }]">
                          <el-input type="number" v-model.number="form.ports[index]"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-button @click.prevent="removePort(index)">
                        <i class="el-icon-delete"></i>
                      </el-button>
                    </el-row>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <el-row type="flex" justify="center">
          <el-button type="primary" :loading="wait5seconds" @click="submit">
            创建
          </el-button>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import * as type from '@/store/app/mutations_types'
import * as form from '@/views/minihost/services/form'
import * as fetchApp from '@/api/app'
export default {
  data () {
    return {
      form: form.mcForm,
      wait5seconds: false,
      imagesFront: [],
      tagsFront: [],
      rules: form.mcRules
    }
  },
  computed: {
    ...mapActions({
      fetchApps: type.FETCH_APPS
    }),
    sshDelete () {
      return this.form.ssh.length < 2
    },
    canAddSsh () {
      return this.form.ssh.length > 2
    }
  },
  methods: {
    addRSA () {
      this.form.ssh.push(' ')
    },
    changeImageFront () {

    },
    removeConfig (index) {
      this.form.ssh.splice(index, 1)
    },
    addPort () {
      this.form.ports.push(' ')
    },
    removePort (index) {
      this.form.ports.splice(index, 1)
    },
    submit () {
      this.$refs.mcForm.validate((valid) => {
        if (valid) {
          let submitForm = form.submitForm()
          fetchApp.create(submitForm)
          // handle.formatYmlForm(this.form, submitForm)
          this.msg(this.form, submitForm)
        }
      })
    },
    msg (form, submitForm) {
      this.$msgbox({
        message: '确定提交？',
        // confirmButtonClass: 'none',
        closeOnPressEscape: true,
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '发布中...'
            instance.showCancelButton = false
            instance.message = submitForm.appName
            setTimeout(() => {
              instance.confirmButtonLoading = false
              done()
            }, 10000)
          } else {
            done()
          }
        }
      }).then(action => {
        if (action === 'confirm') {
          this.$router.push({name: 'octopus列表'})
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
