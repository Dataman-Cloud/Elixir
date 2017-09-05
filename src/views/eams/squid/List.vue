<script>
import BaseAppList from '@/views/eams/components/BaseAppList'
import { mapGetters } from 'vuex'
export default {
  extends: BaseAppList,
  data () {
    return {
      appPrefix: 'squid',
      imgSrc: require('../../../assets/squid.svg'),
      createLink: 'squid-up'
    }
  },
  computed: {
    ...mapGetters({
      List: 'squidList'
    })
  }
}
</script>

<style lang="css">
</style>
