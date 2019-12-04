<template>
  <blog-info :id="this.id"></blog-info>
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
    'blog-info': Info
  }
}

</script>

<style lang="less" scoped>
</style>