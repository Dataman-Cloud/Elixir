<template>
  <el-dialog title="添加主机" v-model="dialogVisible" size="tiny" ref="dialog">
    <div>
      编辑集群
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import * as cluster from '@/api/cluster'
import * as type from '@/store/user-group/mutations_types'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      loading: false,
      dialogVisible: false,
      submitLoading: false,
      userGroups: [],
      form: {
        clusterLabel: '',
        desc: ''
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
  methods: {
    ...mapActions({
      fetchUserGroups: type.FETCH_USER_GROUPS
    }),
    close () {
      this.resetForm()
      this.submitLoading = false
    },
    open: function () {
      this.$refs.dialog.open()
    },
    async openUserGroup () {
      let data = await this.fetchUserGroups()
      this.userGroups = data.data
    },
    onSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.submitLoading = true
          try {
            await cluster.create(this.form)
            this.dialogVisible = false
            this.$store.dispatch(type.FETCH_CLUSTERS)
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
