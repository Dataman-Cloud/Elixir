<template>
  <el-dialog title="日志详情" v-model="dialogVisible" size="small" ref="dialog" @close="close">
    <div style="width: 37vw; height: 60vh; overflow-y:scroll; overflow-x: hidden" v-scroll="dialogVisible" v-loading="loading" element-loading-text="数据加载中..." v-html="log">
    </div>
  </el-dialog>
</template>
<script>
  import * as fetchCicd from '@/api/cicd'

  export default {
    data () {
      return {
        loading: false,
        log: '',
        dialogVisible: false
      }
    },
    directives: {
      scroll: function (el, bind) {
        if (!bind.value) {
          el.scrollTop = 0
        }
      }
    },
    methods: {
      close () {
        this.dialogVisible = false
        this.log = ''
      },
      async open (jobName, buildNum) {
        this.loading = true
        let res = await fetchCicd.logDetail(this.$route.params.name, buildNum)
        this.log = res.data
        this.$refs.dialog.open()
      }
    }
  }
</script>
<style scoped>

</style>
