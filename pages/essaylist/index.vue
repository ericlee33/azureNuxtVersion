<template>
    <essay-list :category="category" :info="info"></essay-list>
</template>

<script>
import List from '~/components/List.vue'

export default {
  data() {
    return {
      category: '个人随笔',
      info: 'essaylist-'
    }
  },
  components: {
    'essay-list': List
  }
}
</script>

<style lang="less" scoped>
</style>