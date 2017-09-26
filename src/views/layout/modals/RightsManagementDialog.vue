<template>
  <el-dialog title="权限管理" v-model="dialogVisible" size="small" ref="dialog">

    <el-form ref="form" :model="form" label-width="50px">
      <el-form-item label="角色" style="width:283px">
        <el-select v-model="form.role" placeholder="请选择" @change="listLimits(form.role)">
          <el-option v-for="(item,index) in roles" :key="index" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-alert
    title="友情提示:该操作仅限平台管理员，对权限管理，请谨慎操作"
    type="info" :closable="false" show-icon style="position:absolute;right:20px;top:90px;width:43%;height:20px;line-height:15px;margin-bottom:10px;">
  </el-alert>
    <div>
      <el-transfer v-model="rightLimit" :data="limitsList" :titles="['选择权限','已有权限']"></el-transfer>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addRights">确 定</el-button>
    </div>

  </el-dialog>
</template>

<script>
import * as type from '@/api/layout'

export default {
  data () {
    return {
      dialogVisible: false,
      limitsList: [],
      rightLimit: [],
      roles: [{
        value: 'superuser',
        label: '租户'
      }, {
        value: 'owner',
        label: '组管理员'
      }, {
        value: 'member',
        label: '组成员'
      }],
      form: {
        role: 'superuser'
      }
    }
  },
  methods: {
    async addRights () {
      await type.updateLimits({role: this.form.role, resources: this.rightLimit})
      this.dialogVisible = false
      this.$notify({ message: '权限修改成功' })
    },
    async listLimits (name) {
      let { data } = await type.limitsList(name)
      this.rightLimit = data.resources.map(item => item.id)
      this.limitsList = data.resourcesAll.map(item => {
        return {
          key: item.id,
          label: item.resourceName + ':' + item.description
        }
      })
    },
    open () {
      this.$refs.dialog.open()
      this.listLimits(this.form.role)
    }
  }
}
</script>

