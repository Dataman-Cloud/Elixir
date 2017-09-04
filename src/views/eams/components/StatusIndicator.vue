<template>
  <el-tooltip class="item" effect="dark" :content="status" placement="top-start">
    <div class="status--indicator--container">
      <span class="status--indicator--inner" :class="[status]">

      </span>
    </div>
  </el-tooltip>
</template>

<script>
export default {
  name: 'status-indicator',
  props: {
    status: {
      type: String,
      default: 'noop'
    }
  }
}
</script>

<style lang="scss" scoped>
.status--indicator--container {
  display: inline-block;
  font-size: 0;
  margin-left: 10px;
  vertical-align: middle;
  .status--indicator--inner {
    background-image: none;
    border-radius: 6px;
    padding: 8px 16px;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    vertical-align: middle;
    line-height: 1;
    display: inline-block;
  }
  .creating {
    background-color: #eef1f6;
    border-color: #eef1f6;
    box-shadow: 01px 0 0 0 #eef1f6;
  }
  .noop {
    background-color: #ff5a5f;
    border-color: #ff5a5f;
    box-shadow: 01px 0 0 0 #ff5a5f;
  }
  .abc {
    background-color: #48e245;
    border-color: #48e245;
    box-shadow: 01px 0 0 0 #48e245;
  }
}
</style>
