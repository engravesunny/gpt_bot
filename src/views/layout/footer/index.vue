<template>
  <div class="footer">
    <div class="home iconfont">
      <div class="icon" v-if="curPage.includes('home')">&#xe63b;</div>
      <div class="icon" v-else @click="handleJumpTo('/home')">&#xe63c;</div>
      <div class="text" @click="handleJumpTo('/home')">主页</div>
    </div>
    <div class="user iconfont">
      <div class="icon" v-if="curPage === 'user'">&#xe600;</div>
      <div class="icon" v-else @click="handleJumpTo('/user')">&#xe601;</div>
      <div class="text" @click="handleJumpTo('/user')">我的</div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { computed } from "vue";
const router = useRouter();
const route = useRoute();

const curPage = computed(() => {
  return route.name;
});

const handleJumpTo = (path) => {
  router.push(path);
};
</script>

<style lang="less" scoped>
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 65px;
  display: flex;
  background-color: #fff;
  box-shadow: 0 2px 2px 0px rgba(0, 0, 0, 0.3);
  .home,
  .user {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    .icon {
      font-size: 22px;
      font-weight: 700;
    }
    .text {
      font-size: 12px;
      color: #333;
      font-weight: 700;
    }
  }
}
</style>
