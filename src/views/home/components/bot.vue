<template>
  <div class="bot" @click="handleJumpToBot">
    <div class="bot-avatar">
      <div class="left">
        <img :src="avatar" :alt="name" />
      </div>
    </div>
    <div class="right">
      <div class="bot-name">{{ name }}</div>
      <div class="bot-dsp">{{ dsp }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";
const props = defineProps({
  name: String,
  dsp: String,
  avatar: String,
});
const router = useRouter();
const handleJumpToBot = () => {
  router.push({
    path: "/bot",
    query: {
      ...props,
    },
  });
};
</script>

<style lang="less" scoped>
.bot {
  width: 100%;
  height: 70px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  overflow: hidden;
  gap: 10px;
  &:active {
    background-color: rgb(245, 246, 248);
  }
  .left {
    width: 55px;
    height: 55px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    max-width: calc(100% - 85px);
    justify-content: space-around;
    .bot-name {
      font-size: 16px;
      font-weight: 900;
    }
    .bot-dsp {
      font-size: 12px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
</style>
