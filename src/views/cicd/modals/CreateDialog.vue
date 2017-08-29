<template>
  <el-dialog title="新建项目" v-model="dialogVisible" size="small" ref="dialog" @close="close">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <div style="height: 60vh; overflow-y:scroll; overflow-x: hidden" v-scroll="dialogVisible">
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="form.projectName" placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <el-form-item label="代码地址" prop="sourceUrl">
          <el-input v-model="form.sourceUrl" placeholder="请输入代码地址"></el-input>
        </el-form-item>
        <el-form-item label="镜像名称" prop="imageName" required>
          <el-input v-model="form.imageName" placeholder="请输入镜像名称"></el-input>
        </el-form-item>
        <el-form-item label="标签名称" prop="tagName">
          <el-input v-model="form.tagName" placeholder="请输入标签名称"></el-input>
        </el-form-item>
        <el-form-item label="仓库认证">
          <el-select v-model="form.credential" @visible-change="selectJenkins" placeholder="请选择credential">
            <el-option :key="jenkin.id" v-for="jenkin in jenkins" :label="jenkin.displayName" :value="jenkin.id">{{jenkin.displayName}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目说明" prop="projectDesc">
          <el-input type="textarea" v-model="form.projectDesc" placeholder="请输入项目说明(可选)"></el-input>
        </el-form-item>
        <el-form-item label="代码分支" prop="branch">
          <el-input v-model="form.branch" placeholder="请输入代码分支(默认master)"></el-input>
        </el-form-item>
        <el-form-item label="自动构建">
          <el-switch v-model="form.resource" on-color="#01C4BC" off-color="#ff4949"></el-switch>
          <p v-if="form.resource">如需自动构建请在gitlab上配置hook地址为：{{url}}/v1/cicd/jenkins/hook/{{form.projectName}}</p>
        </el-form-item>
        <!--<el-form-item label="触发规则">-->
        <!--<el-radio-group v-model="form.resource">-->
        <!--<el-radio label="Tag更新"></el-radio>-->
        <!--<el-radio label="Branch更新"></el-radio>-->
        <!--</el-radio-group>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="网络模式">-->
        <!--<el-radio-group v-model="form.type">-->
        <!--<el-radio label="网桥模式"></el-radio>-->
        <!--<el-radio label="HOST 模式"></el-radio>-->
        <!--</el-radio-group>-->
        <!--</el-form-item>-->
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSubmit" :loading="submitLoading">立即创建</el-button>
      <el-button @click="dialogVisible = false">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import * as fetchCicd from '@/api/cicd'
import * as type from '@/store/cicd/mutations_types'
import { mapActions } from 'vuex'
import BASE_URL from 'baseUrl'

export default {
  data () {
    return {
      dialogVisible: false,
      submitLoading: false,
      jenkins: [],
      form: {
        projectName: '',
        imageName: '',
        projectDesc: '',
        sourceUrl: '',
        tagName: '',
        branch: '',
        resource: false,
        credential: ''
      },
      url: BASE_URL,
      rules: {
        projectName: [
          { required: true, message: '项目名称不能为空' },
          { pattern: /^[a-z0-9]+$/, message: '项目名称只能包含数字、小写字母' }
        ],
        sourceUrl: [
          { required: true, message: '代码地址不能为空' }
        ],
        imageName: [
          { required: true, message: '镜像名称不能为空' },
          { pattern: /^[a-z0-9]+$/, message: '镜像只能包含数字、小写字母' }
        ],
        tagName: [
          { required: true, message: '标签名称不能为空' },
          { pattern: /^[a-z0-9.]+$/, message: '标签名称只能包含数字、小写字母和小数点' }
        ],
        projectDesc: [
          { max: 256, message: '最大长度256个字符' }
        ]
      }
    }
  },
  computed: {},
  directives: {
    scroll: function (el, bind) {
      if (!bind.value) {
        el.scrollTop = 0
      }
    }
  },
  methods: {
    ...mapActions({
      fetchJenkins: type.FETCH_JENKINS
    }),
    close () {
      this.resetForm()
      this.submitLoading = false
    },
    open: function () {
      this.$refs.dialog.open()
    },
    onSubmit: function () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.submitLoading = true
          try {
            await fetchCicd.create(this.form)
            this.dialogVisible = false
            this.$store.dispatch(type.FETCH_CICDS)
          } catch (error) {
            this.submitLoading = false
          }
        } else {
          return false
        }
      })
    },
    resetForm () {
      this.$refs.form.resetFields()
    },
    async selectJenkins (flag) {
      if (flag) {
        let data = await this.fetchJenkins()
        this.jenkins = data
      }
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
