<template>
    <essay-info :id="this.id"></essay-info>
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
    'essay-info': Info
  }
}
</script>

<style lang="less" scoped>
</style>