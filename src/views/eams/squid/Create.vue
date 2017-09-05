<script>
import BaseAppForm from '@/views/eams/components/BaseAppForm'
import * as handle from '@/views/eams/services/handle'

export default {
  extends: BaseAppForm,
  data () {
    return {
      appPrefix: 'squid-'
    }
  },
  methods: {
    formatYmlForm (submitForm) {
      return handle.formatYmlSqdForm(submitForm)
    }
  }
}
</script>

<style lang="css">
</style>
