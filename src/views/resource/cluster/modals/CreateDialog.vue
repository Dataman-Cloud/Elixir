<template>
  <el-dialog title="创建集群" v-model="dialogVisible" size="small" ref="dialog" @close="close">
    <el-form :model="form" ref="form" :rules="rules" label-width="100px">
      <el-form-item label="集群名称" prop="clusterLabel">
        <el-input v-model.number="form.clusterLabel" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属用户组" prop="userGroup">
          <el-select v-model="form.userGroup" @visible-change="openUserGroup" v-loading="loading">
            <el-option v-for="(userGroup, index) in userGroups" :key="index" :value="userGroup.name"></el-option>
          </el-select>
        </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input v-model.number="form.desc" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit" :loading="submitLoading">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import * as cluster from '@/api/cluster'
import * as groupType from '@/store/user-group/mutations_types'
import * as clusterType from '@/store/cluster/mutations_types'
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
      fetchUserGroups: groupType.FETCH_USER_GROUPS
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
