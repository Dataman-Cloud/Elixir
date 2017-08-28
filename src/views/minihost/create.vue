<template>
  <div class="">
    <el-row :gutter="12">
      <el-col :span="10">
        <el-form ref="minihostForm" :model="form" :rules="rules" label-width="150px" element-loading-text="数据加载中...">
          <!-- 主机名称 -->
          <el-form-item label="主机名称" prop="serviceName">
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

          <!-- SSH证书 -->
          <el-form-item label="SSH证书">
            <el-button type="primary" size="small" @click="addRSA()">添加 SSH证书</el-button>
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
              <el-button @click.prevent="removeConfig(index, 'parameters')">
                <i class="el-icon-delete"></i>
              </el-button>
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


          <el-collapse>
            <el-collapse-item title="高级选项" name="1">
              <!-- 服务名称 -->
              <el-row :gutter="8">
                <el-col :span="10">
                  <el-form-item :prop="'gpu'" :rules="[{ type: 'integer', min: 1, message: '宽限时间为正整数' },{ required: true, message: 'gracePeriodSeconds is required' }]">
                    <el-input type="number" v-model.number="form.gpu">
                      <template slot="prepend">端口</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item :prop="'gpu'" :rules="[{ type: 'integer', min: 1, message: '宽限时间为正整数' },{ required: true, message: 'gracePeriodSeconds is required' }]">
                    <el-input type="number" v-model.number="form.gpu">
                      <template slot="prepend">端口</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item :prop="'gpu'" :rules="[{ type: 'integer', min: 1, message: '宽限时间为正整数' },{ required: true, message: 'gracePeriodSeconds is required' }]">
                    <el-input type="number" v-model.number="form.gpu">
                      <template slot="prepend">端口</template>
                    </el-input>
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
import * as service from '@/views/minihost/services/form'

export default {
  data () {
    return {
      form: service.minihostForm,
      wait5seconds: false
    }
  },
  methods: {
    addRSA () {

    }
  }
}
</script>

<style lang="css">
</style>
