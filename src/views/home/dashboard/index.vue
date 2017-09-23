<template>
  <component v-bind:is="currentView">
  </component>
</template>
<script>
import { Owner, Platform, Tenant } from './pages/index'
import { mapGetters } from 'vuex'
export default {
  components: {
    member: Owner,
    owner: Owner,
    platform: Platform,
    tenant: Tenant
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'isPlatform',
      'isOwner',
      'isTenant',
      'isMember'
    ]),
    currentView () {
      let objSet = [
        { key: 'member', value: this.isMember },
        { key: 'owner', value: this.isOwner },
        { key: 'platform', value: this.isPlatform },
        { key: 'tenant', value: this.isTenant }
      ]
      let curObj = objSet.find(obj => obj.value === true)
      return curObj.key || 'member'
    }
  }
}
</script>
