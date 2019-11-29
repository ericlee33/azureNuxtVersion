<template>
    <web-list :category="category" :info="info"></web-list>
</template>

<script>
import List from '~/components/List.vue'

export default {
  data() {
    return {
      category: '前端技术',
      info: 'weblist-'
    }
  },
  components: {
    'web-list': List
  }
}
</script>

<style lang="less" scoped>
</style>