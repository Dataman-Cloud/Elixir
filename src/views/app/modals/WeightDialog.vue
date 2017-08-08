<template>
  <el-dialog title="权重" v-model="dialogVisible" size="small" ref="dialog">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动名称">
        <div class="block">
          <el-slider v-model="form.weight" show-input>
          </el-slider>
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button @click="confirm('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,
      form: {
        weight: null
      }
    }
  },
  methods: {
    open: function (data = {}) {
      this.$refs.dialog.open()
    },
    confirm: function (formName) {
      this.dialogVisible = false
    }
  }
}
</script>
