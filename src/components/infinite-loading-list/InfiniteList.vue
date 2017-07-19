<template>
  <div>
    <div class="infinite-loading">
      <ul>
        <slot name="item"
              v-for="item in items"
              :row="item">
          <!-- 这里写入备用内容 -->
          <span class="itemContext">{{item}}</span>
        </slot>
      </ul>
    </div>
    <infinite-loading spinner="bubbles" :on-infinite="onInfinite" ref="infiniteLoading">
        <span slot="no-more">
          There is no more Hacker News :(
        </span>
    </infinite-loading>
  </div>
</template>
<script>
  import InfiniteLoading from 'vue-infinite-loading'

  export default{
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
        console.log('erererer')
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
    }
  }
</script>
<style scoped>
</style>
