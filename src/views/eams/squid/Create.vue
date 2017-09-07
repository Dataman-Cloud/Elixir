<script>
import BaseAppForm from '@/views/eams/components/BaseAppForm'
import * as handle from '@/views/eams/services/handle'

export default {
  extends: BaseAppForm,
  data () {
    return {
      appPrefix: 'squid-',
      routerAfterSubmit: 'squid'
    }
  },
  methods: {
    formatYmlForm (form, submitForm) {
      return handle.formatYmlSqdForm(form, submitForm)
    }
  }
}
</script>

<style lang="css">
</style>
