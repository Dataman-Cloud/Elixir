<template>
  <div class="">
    <el-row :gutter="12">
      <el-col :span="14">
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

          <!-- 网络模式 -->
          <el-form-item label="网络模式" prop="network">
            <el-radio-group v-model="form.network">
              <el-tooltip class="item" effect="dark" content="BRIDGE模式" placement="top-start">
                <el-radio label="bridge">BRIDGE</el-radio>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="HOST模式" placement="top-start">
                <el-radio label="host">HOST</el-radio>
              </el-tooltip>
            </el-radio-group>
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
                  <el-input v-model="form.ssh[index]" type="textarea">
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
          <el-form-item label="镜像 web">
            <el-row :gutter="8">
              <el-col :span="12">
                <el-form-item prop="image.Image" :rules="[{ required: true, message: 'image is required' }]">
                  <el-select ref="registryCatalogSel" v-model="form.image.Image" @change="changeImageFront" @visible-change="listImg">
                    <el-option v-for="(image, index) in imagesFront" :key="index" :label="image.name"
                               :value="image.name"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item prop="image.tag" :rules="[{ required: true, message: 'tag is required' }]">
                  <el-select ref="registryCatalogTagSel" v-model="form.image.tag">
                    <el-option v-for="(tag, index) in tagsFront" :key="index" :label="tag.tag" :value="tag.tag"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>


          <el-collapse>
            <el-collapse-item title="高级选项" name="1">
              <!-- 服务名称 -->
              <el-row :gutter="8">
                <el-col :span="10">
                  <el-form-item label="GPU" prop="gpu">
                    <el-input type="number" v-model.number="form.gpu">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item prop="disk" label="磁盘规格配置(G)">
                    <el-input type="number" v-model.number="form.disk">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item prop="port" label="SSH端口">
                    <el-row :gutter="8">
                      <el-col :span="8">
                        <el-input v-model.number="form.port" placeholder="默认 22" type="number"></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label="挂载" prop="cmd">
                  <el-row :gutter="10">
                    <el-col :span="20">
                      <el-form-item prop="containerPath">
                        <el-input v-model="form.containerPath">
                          <template slot="prepend">容器路径</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label=" ">
                  <el-row :gutter="10">
                    <el-col :span="20">
                      <el-form-item prop="hostPath">
                        <el-input v-model="form.hostPath">
                          <template slot="prepend">主机路径</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item prop="volumeMode">
                  <el-row :gutter="10">
                    <el-col :span="5">
                      <el-select v-model="form.volumeMode">
                        <el-option value="RW">RW</el-option>
                        <el-option value="RD">RD</el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="CMD" prop="cmd">
                  <el-input v-model.number="form.cmd">
                  </el-input>
                </el-form-item>
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
import * as type from '@/store/minihost/mutations_types'
import * as form from '@/views/minihost/services/form'
import * as handle from '@/views/minihost/services/handle'
import * as minihost from '@/api/minihost'
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
      fetchMinihost: type.FETCH_MINIHOST
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
    listImg () {
      minihost.listRegistry().then(({data}) => {
        this.imagesFront = data
      })
    },
    changeImageFront () {
      this.form.image.tag = ''
      minihost.tagDetail(this.form.image.Image).then(({data}) => {
        this.tagsFront = data
      })
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
          let submitForm = handle.formatForm(this.form)
          minihost.create(submitForm).then(() => {
            this.$router.push({name: '迷你主机列表'})
          })
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
