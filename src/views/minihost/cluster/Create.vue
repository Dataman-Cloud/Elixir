<template>
  <div class="">
    <el-row :gutter="12">
      <el-col :span="12">
        <el-form ref="mcForm" :model="form" :rules="rules" label-width="150px" element-loading-text="数据加载中...">
          <!-- 主机名称 -->
          <el-form-item label="集群名称" prop="serviceName">
            <el-input v-model="form.serviceName">
              <template slot="prepend">minicluster-</template>
            </el-input>
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

          <!-- 镜像 -->
          <el-form-item label="镜像">
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

          <!-- 公网ip -->
          <el-form-item label="公网IP">
            <el-row :gutter="12">
              <el-col :span="12" class="no-padding">
                <el-form-item :prop="'mysql.ip'" :rules="[{ required: true, message: 'gracePeriodSeconds is required' },{ pattern: ipRule, message: 'ip格式不对' }]">
                  <el-input v-model="form.ip">
                    <template slot="prepend">IP</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item :prop="'mysql.port'" :rules="[{ type: 'integer', min: 1, max: 65535, message: '端口号不在 0 - 65535 范围内' },{ required: true, message: 'gracePeriodSeconds is required' }]">
                  <el-input type="number" v-model.number="form.port">
                    <template slot="prepend">端口</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>

          <!-- 带宽 -->
          <el-form-item label="带宽" prop="gpu">
            <el-row :gutter="12">
              <el-col :span="6">
                <el-input type="number" v-model.number="form.gpu">
                  <template slot="append">MB</template>
                </el-input>
              </el-col>
            </el-row>
          </el-form-item>

          <!-- 配置 -->
          <!-- zookeeper地址 -->
          <el-form-item label="集群配置">
            <el-button type="primary" size="small" @click="addZK('parameters')">添加 集群配置</el-button>
          </el-form-item>
          <el-form-item v-for="(zk, index) in form.zookeeperList" :key="index" class="parameters">
            <el-card>
              <div slot="header">
                <el-form-item prop="port" label="端口">
                  <el-row :gutter="8">
                    <el-col :span="8">
                      <el-input v-model.number="zk.p" placeholder="默认 22" type="number"></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
              </div>
              <el-row :gutter="12">
                <el-col :span="12">
                  <el-form-item :prop="'zookeeperList.' + index + '.ip'" :key="zk.index" :rules="[{ required: true, message: 'ip 不能为空' },{ pattern: ipRule, message: 'ip格式不对' }]">
                    <el-input v-model="zk.ip">
                      <template slot="prepend">主机域名</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :prop="'zookeeperList.' + index + '.port'" :key="zk.index" :rules="[{ required: true, message: 'port 不能为空' },{ type: 'integer', min: 1, max: 65535, message: '端口号不在 0 - 65535 范围内' }]">
                    <el-input v-model.number="zk.port">
                      <template slot="prepend">port</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-button @click.prevent="removeConfig(index, 'parameters')" :disabled="zkDelete">
                  <i class="el-icon-delete"></i>
                </el-button>
              </el-row>
            </el-card>

          </el-form-item>
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
      form: form.miniClusterForm,
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
