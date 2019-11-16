<template>
  <blog-list :category="category" :info="info"></blog-list>
</template>

<script>
import List from '~/components/List.vue'

export default {
  data() {
    return {
      category: undefined,
      info: 'bloginfo'
    }
  },
  components: {
    'blog-list': List
  }
}

</script>

<style lang="less" scoped>
</style>