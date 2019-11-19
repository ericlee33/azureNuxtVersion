<template>
  <div class="admin-hello">
    <p>欢迎来到管理系统,这里可以进行一些数据操作,请点击左侧导航栏按钮</p>
  </div>
</template>

<script>
export default {
  layout: 'admin'
}
</script>

<style lang="less" scoped>
p {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  color: chocolate;
  font-size: 20px;
}
</style>