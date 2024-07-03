<template>
  <div class="chat-page iconfont">
    <div class="nav">
      <div class="back" @click="router.back()">&#xe61e;</div>
      {{ botInfo.name }}
    </div>
    <div class="avatar">
      <img :src="botInfo.avatar" alt="botInfo.name" />
    </div>
    <div class="audio-play">
      <div class="waves">
        <div
          v-for="item in waves"
          :key="item"
          :style="{ height: `${item.height}px` }"
          class="wave"
        ></div>
      </div>
      <div class="text">{{ displayText }}</div>
    </div>

    <div class="options footer">
      <div
        v-if="chattingStatus === ChatStatus.Chatting"
        class="chatting"
        @click="cancelChatting"
      >
        &#xe680;
      </div>
      <div
        v-if="chattingStatus === ChatStatus.Ready"
        class="ready"
        @click="startRecord"
      >
        &#xe687;
      </div>
      <div
        v-if="chattingStatus === ChatStatus.Thinking"
        class="thinking"
        @click="cancelChatting"
      >
        &#xe649;
      </div>
      <div
        v-if="chattingStatus === ChatStatus.Listening"
        class="listening"
        @click="stopRecord"
      >
        &#xe625;
      </div>
      <div class="dsl">内容由讯飞AI生成，不能完全保障真实</div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import { ChatStatus } from "@/constants/index.js";
import { useChatting } from "@/hooks/useChatting.js";

const {
  waves,
  chattingStatus,
  displayText,
  stopRecord,
  startRecord,
  cancelChatting,
} = useChatting();

const route = useRoute();
const router = useRouter();
const botInfo = computed(() => {
  return route.query;
});
</script>

<style lang="less" scoped>
.chat-page {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background-color: #000;
  position: relative;
  color: #fff;
  padding: 45px 0 160px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .nav {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    height: 50px;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: 700;

    .back {
      position: absolute;
      top: 0px;
      left: 10px;
      font-size: 32px;
      color: #fff;
      font-weight: 700;
    }
  }

  .avatar {
    width: 100%;
    aspect-ratio: 1;
    padding: 70px;
    box-sizing: border-box;

    img {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      border: 10px solid #fff;
    }
  }

  .audio-play {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 25px;

    .waves {
      display: flex;
      align-items: center;
      min-height: 32px;
      gap: 3px;
    }

    .wave {
      width: 16px;
      height: 16px;
      max-height: 32px;
      border-radius: 10px;
      background-color: #fff;
      transition: all 0.3s;
    }

    .text {
      font-size: 16px;
    }
  }

  .options {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
    box-sizing: border-box;
    padding: 30px 0 5px 0;

    .chatting,
    .ready,
    .thinking,
    .listening {
      width: 75px;
      height: 75px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgb(255, 65, 67);
      border-radius: 50%;
      font-size: 40px;
    }

    .ready,
    .thinking {
      background-color: #b869fa;
    }

    .thinking {
      animation: loading 1s linear;
    }

    .dsl {
      height: 20px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.6);
    }
  }

  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 160px;
  }
}

@keyframes loading {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
