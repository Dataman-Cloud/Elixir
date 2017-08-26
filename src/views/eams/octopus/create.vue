<template>
  <div class="">
    <el-row :gutter="12">
      <el-col :span="10">
        <el-form ref="octopusForm" :model="form" :rules="rules" label-width="150px" v-loading="loading" element-loading-text="数据加载中...">
          <!-- 服务名称 -->
          <el-form-item label="服务名称" prop="serviceName">
            <el-input v-model="form.serviceName">
              <template slot="prepend">octopus-</template>
            </el-input>
          </el-form-item>

          <!-- 实例模式 -->
          <el-form-item label="实例模式" prop="instanceMode">
            <el-radio-group v-model="form.instanceMode">
              <el-radio label="local">单机模式</el-radio>
              <el-radio label="cluster">集群模式</el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- 服务器规格配置 -->
          <el-form-item label="服务器规格配置" prop="containerSizeMode">
            <el-radio-group v-model="form.containerSizeMode">
              <el-radio label="low">基础配置</el-radio>
              <el-radio label="medium">中等配置</el-radio>
              <el-radio label="high">高级配置</el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- zookeeper地址 -->
          <el-form-item label="zookeeper地址">
            <el-button type="primary" size="small" @click="addZK('parameters')">添加 zookeeper 地址</el-button>
          </el-form-item>
          <el-form-item v-for="(zk, index) in form.zookeeperList" :key="index" class="parameters">
            <el-row :gutter="12">
              <el-col :span="12">
                <el-form-item :prop="'zookeeperList.' + index + '.ip'" :key="zk.ip" :rules="[{ required: true, message: 'KEY 不能为空' },{ pattern: /^[^\u4e00-\u9fa5]*$/, message: 'KEY 不能包含中文' }]">
                  <el-input v-model="zk.ip">
                    <template slot="prepend">ip</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :prop="'zookeeperList.' + index + '.port'" :key="zk.port" :rules="[{ required: true, message: 'VALUE 不能为空' },{ pattern: /^[^\u4e00-\u9fa5]*$/, message: 'VALUE 不能包含中文' }]">
                  <el-input v-model="zk.port">
                    <template slot="prepend">port</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-button @click.prevent="removeConfig(index, 'parameters')">
                <i class="el-icon-delete"></i>
              </el-button>
            </el-row>
          </el-form-item>

          <!-- mysql -->
          <el-form-item class="wrapContainerRow" label="Mysql">
            <el-row :gutter="12">
              <el-col :span="12" class="no-padding">
                <el-form-item :prop="'mysql.ip'" :rules="[,{ required: true, message: 'gracePeriodSeconds is required' }]">
                  <el-input v-model="form.mysql.ip">
                    <template slot="prepend">IP</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item :prop="'mysql.port'" :rules="[{ type: 'integer', min: 1, message: '宽限时间为正整数' },{ required: true, message: 'gracePeriodSeconds is required' }]">
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
                <el-form-item :prop="'mysql.username'" :rules="[{ required: true, message: 'gracePeriodSeconds is required' }]">
                  <el-input v-model.number="form.mysql.username">
                    <template slot="prepend">用户名</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item :prop="'mysql.password'" :rules="[{ required: true, message: 'gracePeriodSeconds is required' }]">
                  <el-input v-model.number="form.mysql.password">
                    <template slot="prepend">密码</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>

          <!-- 镜像 -->
          <el-form-item label="镜像 web" prop="image">
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

          <el-form-item label="镜像 console" prop="image">
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

          <!--  -->
          <el-form-item prop="port" :rules="[{ type: 'integer', min: 1, max: 65535, message: '端口号不在 0 - 65535 范围内' }]" label="端口">
            <el-row :gutter="8">
              <el-col :span="8">
                <el-input v-model.number="form.port" placeholder="端口"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as service from '@/views/eams/services/form'
export default {
  data () {
    return {
      form: service.octopusForm,
      rules: {}
    }
  },
  methods: {
    addZK () {
      this.form.zookeeperList.push({
        ip: '',
        port: ''
      })
    },
    removeConfig (index) {
      this.form.zookeeperList.splice(index, 1)
    }
  }
}
</script>

<style lang="css">
.no-padding {
  margin-left: -6px;
}
</style>
