<template>
  <div>
    <div class="infinite-loading">
      <ul>
        <slot name="item" v-for="(item, index) in items" :row="item">
          <!-- 这里写入备用内容 -->
          <span class="itemContext">{{item}}</span>
        </slot>
      </ul>
    </div>
    <infinite-loading spinner="spiral" :on-infinite="onInfinite" ref="infiniteLoading">
      <!-- hack: Hide the loading figure-->
      <i slot="spinner"></i>
      <span slot="no-more">
        There is no more Log :(
      </span>
    </infinite-loading>
  </div>
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading'

export default {
  components: {
    InfiniteLoading
  },
  props: {
    items: {
      type: Array,
      default: []
    }
  },
  methods: {
    onInfinite () {
      this.$emit('onInfinite')
    }
  },
  mounted () {
    this.$on('InfiniteLoaded', () => {
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
    })
    this.$on('InfiniteComplete', () => {
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
    })
    this.$on('InfiniteReset', () => {
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
    })
  }
}
</script>
<style scoped>

</style>
