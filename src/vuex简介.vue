<template>
  <div>
    <!-- <router-view></router-view> -->
    <h1>{{ count }}</h1>
    <h1>count的10倍{{ bigNum }}</h1>
    <button @click="SET_COUNT(10)">自加一</button>
  </div>
</template>

<script>
// 下载vant
// yarn add vant@latest-v2 -S

// 下载
//  yarn add -D postcss-pxtorem

//  mapState-->将vuex里面state映射到computed
//  mapGetters-->将vuex里面getters映射到computed
//  mapMutations-->将vuex里面Mutations映射到methods

// 使用
// -引用mapState:函数，返回一个对象
// - 参数：['']
import { mapGetters, mapState, mapMutations } from 'vuex'
export default {
  methods: {
    // increment() {
    //   this.$store.commit('SET_COUNT', 10)
    // }
    ...mapMutations(['SET_COUNT'])
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['bigNum'])
  }
}
</script>

<style scoped>
.box {
  width: 700px;
  height: 60px;
  font-size: 50px;
  background-color: aqua;
}
</style>
