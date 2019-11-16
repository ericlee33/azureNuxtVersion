<template>
  <div class="error">
    <!-- 如果用户强行输入url地址进入后台触发404 -->
    error,您没有权限访问管理系统
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>
.error {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
}
</style>