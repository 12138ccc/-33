<template>
  <div>
    <!-- 搜索框 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button icon="search" size="small" block round>搜索</van-button>
      </template>
    </van-nav-bar>

    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <!-- 文章详情 -->
        <article-list :id="item.id"></article-list>
      </van-tab>
      <span class="toutiao toutiao-gengduo" @click="isShow = true"></span>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="isShow"
      position="bottom"
      closeable
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <channel-edit
        v-if="isShow"
        @change-active=";[(isShow = false), (active = $event)]"
        :my-channels="channels"
        @del-channel="delChannel"
        @add-channel="addChannel"
      >
      </channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getChannelAPI, delChannelAPI, addChannelAPI } from '@/api'
import ArticleList from './components/ArticleList.vue'
import channelEdit from './components/ChannelEdit.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: { ArticleList, channelEdit },
  data() {
    return {
      active: 0,
      channels: [],
      isShow: false
    }
  },
  created() {
    this.initChannles()
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  // 1 ?? ==>相当于|| 常用于语句
  // 2 ?. ==>可选链操作符，?前面是underfined，那么不会往后取值
  methods: {
    ...mapMutations(['SET_MY_CHANNELS']),
    initChannles() {
      if (this.isLogin) {
        // 1 如果你登录了
        /// 2 -channels 应该发请求获取用户自己的频道
        this.getChannel()
      } else {
        // 2 未登录
        // - 1 本地存储里有数据，channels用本地存储
        // 2.本地存储没有数据，发送请求，获取默认的频道数据
        const myChannels = this.$store.state.myChannels
        if (myChannels.length === 0) {
          this.getChannel()
        } else {
          this.channels = myChannels
        }
      }
    },
    async getChannel() {
      try {
        const { data } = await getChannelAPI()
        this.channels = data.data.channels
      } catch (error) {
        // js的错误 给程序员 axios状态码507 提示用户
        if (!error.response) {
          throw error
        } else {
          const status = error.response.status
          status === 507 && this.$toast.fail('请刷新')
        }
      }
    },
    // 1 视图层删除频道
    async delChannel(id) {
      try {
        const newChannels = this.channels.filter((item) => item.id !== id)
        // 1. 发送删除请求
        if (this.isLogin) {
          await delChannelAPI(id)
        } else {
          // 把我的频道存在本地存储
          this.SET_MY_CHANNELS(newChannels)
        }
        // 2 视图层删除频道
        this.channels = newChannels

        this.$toast.success('删除频道成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请登录再删除')
        } else {
          throw error
        }
      }
    },
    async addChannel(channel) {
      try {
        if (this.isLogin) {
          // 1.发送请求频道
          await addChannelAPI(channel.id, this.channels.length)
        } else {
          // 把我的频道存在本地存储
          this.SET_MY_CHANNELS([...this.channels, channel])
        }
        // 视图层添加频道
        this.channels.push(channel)
        this.$toast.success('添加频道成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请登录再添加')
        } else {
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;

  // inherit 继承
  // unset 不设置
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button--default {
    background-color: #5babfb;
    border: 0;
    color: #fff;
    font-size: 30px;
  }

  .van-icon {
    color: #fff;
  }
  .van-button--block {
    width: 7.4rem;
  }
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
