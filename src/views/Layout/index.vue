<template>
  <div>
    <!-- 二级路由 -->
    <router-view> </router-view>
    <!-- 导航区 -->
    <van-tabbar class="tabbar" route>
      <van-tabbar-item to="/ ">
        <template #icon>
          <span class="toutiao toutiao-shouye"></span>
          <span class="wz">首页</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon>
          <span class="toutiao toutiao-shipin"></span>
          <span class="wz">视频</span>
        </template></van-tabbar-item
      >
      <van-tabbar-item to="/qa">
        <template #icon>
          <span class="toutiao toutiao-wenda"></span
          ><span><span class="wz">问答</span></span>
        </template></van-tabbar-item
      >
      <van-tabbar-item to="/profile">
        <template #icon>
          <span class="toutiao toutiao-wode"></span>
          <span
            ><span class="wz">{{ isLogin ? '我的' : '未登录' }}</span></span
          ></template
        ></van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isLogin'])
  }
}
</script>

<style scoped lang="less">
.tabbar {
  :deep(.van-tabbar-item__icon) {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-evenly;
    align-items: center;
  }
  .toutiao {
    font-size: 40px;
  }
  .wz {
    font-size: 30px;
  }
}
</style>
