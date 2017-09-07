<template>
  <el-dialog title="创建集群" v-model="dialogVisible" size="tiny" ref="dialog" @close="close">
    <el-form :model="form" ref="form" :rules="rules" label-width="120px">
      <el-form-item label="集群名称" prop="clusterLabel">
        <el-input v-model.number="form.clusterLabel" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属用户组">
        <el-input type="input"  v-model="currentGroupName" disabled></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input type="textarea" v-model.number="form.desc" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSubmit" :loading="submitLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import * as cluster from '@/api/cluster'
import * as clusterType from '@/store/cluster/mutations_types'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      loading: false,
      dialogVisible: false,
      submitLoading: false,
      userGroups: [],
      form: {
        clusterLabel: '',
        desc: '',
        userGroup: ''
      },
      rules: {
        clusterLabel: [
          { required: true, message: '集群名称不能为空' }
        ],
        userGroup: [
          { required: true, message: '请选择所属用户组' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      currentGroupName (state) {
        return state.user.currentGroupName
      }
    })
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
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.submitLoading = true
          try {
            await cluster.create(this.form)
            this.dialogVisible = false
            this.$store.dispatch(clusterType.FETCH_CLUSTERS)
            this.loading = false
          } catch (error) {
            this.submitLoading = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm () {
      this.$refs.form.resetFields()
    }
  }
}
</script>
