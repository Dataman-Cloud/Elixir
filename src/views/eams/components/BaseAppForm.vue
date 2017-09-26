<template>
  <div class="">
    <el-row :gutter="12">
      <el-col :span="12">
        <el-form ref="form" :model="form" :rules="rules" label-width="150px" element-loading-text="数据加载中...">
          <!-- 服务名称 -->
          <el-form-item label="服务名称" prop="serviceName">
            <el-input v-model="form.serviceName">
              <template slot="prepend">{{appPrefix}}</template>
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

          <!-- 集群 -->
          <el-form-item label="选择集群" prop="cluster">
            <el-select @visible-change="selectCluster" v-model="form.cluster">
              <el-option v-for="(cluster,index) in clusters" :key="index" :value="cluster.clusterLabel" :label="cluster.clusterLabel"></el-option>
            </el-select>
          </el-form-item>

          <!-- zookeeper地址 -->
          <!-- <el-form-item label="zookeeper地址">
            <el-button type="primary" size="small" @click="addZK('parameters')">添加 zookeeper 地址</el-button>
          </el-form-item>
          <el-form-item v-for="(zk, index) in form.zookeeperList" :key="index" class="parameters">
            <el-row :gutter="12">
              <el-col :span="12">
                <el-form-item :prop="'zookeeperList.' + index + '.ip'" :key="zk.index" :rules="[{ required: true, message: 'ip 不能为空' },{ pattern: ipRule, message: 'ip格式不对' }]">
                  <el-input v-model="zk.ip">
                    <template slot="prepend">ip</template>
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
          </el-form-item> -->

          <!-- mysql -->
          <el-form-item class="wrapContainerRow" label="Mysql">
            <el-row :gutter="12">
              <el-col :span="12" class="no-padding">
                <el-form-item :prop="'mysql.ip'" :rules="[{ required: true, message: 'gracePeriodSeconds is required' },{ pattern: ipRule, message: 'ip格式不对' }]">
                  <el-input v-model="form.mysql.ip">
                    <template slot="prepend">IP</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item :prop="'mysql.port'" :rules="[{ type: 'integer', min: 1, max: 65535, message: '端口号不在 0 - 65535 范围内' },{ required: true, message: 'gracePeriodSeconds is required' }]">
                  <el-input type="number" v-model.number="form.mysql.port">
                    <template slot="prepend">端口</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row :gutter="12">
              <el-col :span="12">
                <el-form-item :prop="'mysql.username'" :rules="[{ required: true, message: '用户名 不能为空' }]">
                  <el-input v-model.number="form.mysql.username">
                    <template slot="prepend">用户名</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item :prop="'mysql.password'" :rules="[{ required: true, message: '密码 不能为空' }]">
                  <el-input v-model.number="form.mysql.password">
                    <template slot="prepend">密码</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>

          <!-- 镜像 -->
          <el-form-item label="镜像 web">
            <el-row :gutter="8">
              <el-col :span="12">
                <el-form-item prop="image.Image" :rules="[{ required: true, message: 'web image is required' }]">
                  <el-select ref="registryCatalogSel" v-model="form.image.Image" @change="changeImageFront" @visible-change="listFrontImg" :loading="imgFrontloading">
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

          <el-form-item label="镜像 console" prop="image">
            <el-row :gutter="8">
              <el-col :span="12">
                <el-form-item prop="imageB.Image" :rules="[{ required: true, message: 'console image is required' }]">
                  <el-select ref="registryCatalogSel" v-model="form.imageB.Image" @change="changeImageBack" @visible-change="listBackImg" v-loading="imgBackloading">
                    <el-option v-for="(image, index) in imagesBack" :key="index" :label="image.name"
                               :value="image.name"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item prop="imageB.tag" :rules="[{ required: true, message: 'tag is required' }]">
                  <el-select ref="registryCatalogTagSel" v-model="form.imageB.tag">
                    <el-option v-for="(tag, index) in tagsBack" :key="index" :label="tag.tag" :value="tag.tag"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>

          <!--  -->
          <el-form-item prop="port" :rules="[{ type: 'integer', min: 1, max: 65535, message: '端口号不在 0 - 65535 范围内' }]" label="端口">
            <el-row :gutter="8">
              <el-col :span="8">
                <el-input v-model.number="form.port" placeholder="端口"></el-input>
              </el-col>
            </el-row>
          </el-form-item>

          <!-- LDAP -->
          <el-form-item class="wrapContainerRow" label="LDAP">
            <el-row :gutter="12">
              <el-col :span="12" class="no-padding">
                <el-form-item :prop="'LDAP.username'" :rules="[{ required: true, message: 'LDAP 用户名 is required' }]">
                  <el-input v-model="form.LDAP.username">
                    <template slot="prepend">用户名</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item :prop="'LDAP.password'" :rules="[{ required: true, message: '密码不为空' }]">
                  <el-input type="number" v-model.number="form.LDAP.password">
                    <template slot="prepend">密码</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
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
import * as form from '@/views/eams/services/form'
import * as eams from '@/api/eams'
import * as handle from '@/views/eams/services/handle'
import { mapState } from 'vuex'
export default {
  name: 'base-app-form',
  data () {
    return {
      appPrefix: 'app',
      form: form.baseForm,
      rules: form.formRules,
      wait5seconds: false,
      tagsFront: [],
      imagesFront: [],
      tagsBack: [],
      imagesBack: [],
      imgFrontloading: false,
      imgTagFrontloading: false,
      imgBackloading: false,
      imgTagBackloading: false,
      ipRule: form.ipRule,
      routerAfterSubmit: 'app',
      clusters: []
    }
  },
  computed: {
    ...mapState({
      userId: state => state.user.id,
      currentGroupId: state => state.user.currentGroupId
    }),
    zkDelete () {
      return this.form.zookeeperList.length < 2
    }
  },
  mounted () {

  },
  methods: {
    // addZK () {
    //   this.form.zookeeperList.push({
    //     ip: '',
    //     port: ''
    //   })
    // },
    // removeConfig (index) {
    //   this.form.zookeeperList.splice(index, 1)
    // },
    listFrontImg () {
      this.imgFrontloading = true
      try {
        eams.listRegistry().then(({data}) => {
          this.imagesFront = data
        })
      } catch (e) {

      } finally {
        this.imgFrontloading = false
      }
    },
    listBackImg () {
      this.imgBackloading = true
      try {
        eams.listRegistry().then(({data}) => {
          this.imagesBack = data
        })
      } catch (e) {

      } finally {
        this.imgBackloading = false
      }
    },
    changeImageFront () {
      this.form.image.tag = ''
      eams.tagDetail(this.form.image.Image).then(({data}) => {
        this.tagsFront = data
      })
    },
    changeImageBack () {
      this.form.imageB.tag = ''
      eams.tagDetail(this.form.imageB.Image).then(({data}) => {
        this.tagsBack = data
      })
    },
    async selectCluster () {
      let { data } = await eams.clusterList()
      this.clusters = data
    },
    submit () {
      this.$refs.form.validate((valid) => {
        console.log(valid)
        if (valid) {
          let data = this.formatYmlForm(this.form)
          eams.createComposeNg(data).then((data) => {
            this.$router.push({name: this.routerAfterSubmit})
          })
        }
      })
    },
    formatYmlForm (pageForm) {
      let submitForm = form.newComposeForm()
      return handle.formatYmlOctForm(pageForm, submitForm, this)
    }
  }
}
</script>

<style lang="css">
.no-padding {
  margin-left: -6px;
}
.none {
  display: none;
}
</style>
