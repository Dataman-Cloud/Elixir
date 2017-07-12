<template>
  <el-dialog title="新建项目" v-model="dialogVisible" size="small" ref="dialog" @close="close">
    <div style="width: 37vw; height: 60vh; overflow-y:scroll; overflow-x: hidden" v-scroll="dialogVisible">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="form.projectName" placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <el-form-item label="代码地址" prop="sourceUrl">
          <el-input v-model="form.sourceUrl" placeholder="请输入代码地址"></el-input>
        </el-form-item>
        <el-form-item label="镜像文件" prop="imageName">
          <el-input v-model="form.imageName" placeholder="请输入镜像文件"></el-input>
        </el-form-item>
        <el-form-item label="项目说明" prop="projectDesc">
          <el-input type="textarea" v-model="form.projectDesc" placeholder="请输入项目说明(可选)"></el-input>
        </el-form-item>
        <!--<el-form-item label="自动构建">-->
        <!--<el-radio-group v-model="form.resource">-->
        <!--<el-radio label="是"></el-radio>-->
        <!--<el-radio label="否"></el-radio>-->
        <!--</el-radio-group>-->
        <!--</el-form-item>-->
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
        <el-form-item>
          <el-button type="primary" @click="onSubmit()" :loading="submitLoading">立即创建</el-button>
          <el-button type="primary" @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
  import * as fetchCicd from '@/api/cicd'
  import * as type from '@/store/cicd/mutations_types'

  export default {
    data () {
      return {
        dialogVisible: false,
        submitLoading: false,
        form: {
          projectName: '',
          imageName: '',
          projectDesc: '',
          sourceUrl: ''
        },
        rules: {
          projectName: [
            {required: true, message: '项目名称不能为空'}
          ],
          sourceUrl: [
            {required: true, message: '代码地址不能为空'}
          ],
          imageName: [
            {required: true, message: '镜像不能为空'},
            {pattern: /^[a-z0-9]+$/, message: '镜像只能包含数字、小写字母'}
          ],
          projectDesc: [
            {max: 256, message: '最大长度256个字符'}
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
      close () {
        this.resetForm()
        this.submitLoading = false
      },
      open: function () {
        this.$refs.dialog.open()
      },
      onSubmit () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.submitLoading = true
            fetchCicd.create(this.form)
              .then(() => {
                this.submitLoading = false
                this.dialogVisible = false
                this.$store.dispatch(type.FETCH_CICDS)
              })
          }
        })
      },
      resetForm () {
        this.$refs.form.resetFields()
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
