<template>
  <div>
    <transition name="van-slide-left" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
// 下载vant
// yarn add vant@latest-v2 -S

// 下载
//  yarn add -D postcss-pxtorem

export default {}
</script>

<style scoped>
.box {
  width: 700px;
  height: 60px;
  font-size: 50px;
  background-color: aqua;
}
</style>
