<template>
    <web-info :id="this.id"></web-info>
</template>

<script>
import Info from '~/components/Info.vue'

export default {
  data() {
    return {
      id: this.$route.params.id
    }
  },
  components: {
    'web-info': Info
  }
}
</script>

<style lang="less" scoped>
</style>