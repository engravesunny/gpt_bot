<template>
  <div class="user">
    <div class="top" @click="handleLogin">
      <div class="avatar">
        <img alt="头像" src="https://www.kecat.top/other/logo.png" />
      </div>
      <div class="name">
        {{ userInfo?.phone ? "你好呀" + userInfo?.name : "点我登录" }}
      </div>
    </div>
    <div class="main">
      <div v-for="item in list" :key="item.tag" class="main-item">
        <div class="tag">{{ item.tag }}</div>
        <div class="value">{{ userInfo?.[item.key] }}</div>
        <div class="right iconfont" @click="handleChangeInfo">&#xe61e;</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { mainList } from "@/configs/index.js";
import { userStore } from "@/store/user.js";

const list = mainList();
const { userInfo, token } = userStore();
const router = useRouter();

const handleLogin = () => {
  if (token.value) return;
  router.push("/login");
};
const handleChangeInfo = () => {
  router.push({
    path: "/info",
    query: {
      changeInfo: "1",
    },
  });
};
</script>

<style lang="less" scoped>
.user {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px;

  .top {
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;

    .avatar {
      width: 100px;
      height: 100px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }

    .name {
      font-size: 18px;
      font-weight: 700;
    }
  }

  .main {
    margin-top: 30px;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
    background-color: #fff;
    box-sizing: border-box;
    padding: 10px 5px;
    overflow-y: scroll;
    max-height: 400px;

    .main-item {
      display: flex;
      align-items: center;
      width: 100%;
      font-size: 16px;
      position: relative;
      box-sizing: border-box;
      padding: 20px;
      border-radius: 10px;

      &:active {
        background-color: #dcdcdc45;
      }

      .tag {
        width: 40%;
      }

      .value {
        flex: 1;
        padding-right: 50px;
        display: flex;
        word-wrap: break-word;
        word-break: break-all;
      }

      .right {
        transform: rotate(180deg);
        transform-origin: center;
      }
    }
  }
}
</style>
