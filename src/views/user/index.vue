<template>
  <div class="user">
    <div class="top" @click="handleLogin">
      <div class="avatar">
        <img alt="头像" src="https://www.kecat.top/other/logo.png" />
      </div>
      <div class="name">
        {{ userInfo?.phone ? "你好呀，" + userInfo?.username : "点我登录" }}
      </div>
    </div>
    <div class="main">
      <div v-for="item in list" :key="item.tag" class="main-item">
        <div class="tag">{{ item.tag }}</div>
        <div class="value" v-if="item.key !== 'gender'">{{ userInfo?.[item.key] }}</div>
        <div class="value" v-if="item.key === 'gender'">{{ userInfo?.[item.key] === 1 ? '女': '男' }}</div>
        <div class="right iconfont" @click="handleChangeInfo">&#xe61e;</div>
      </div>
    </div>
    <div class="bottom" @click="handleLogout">
      <button>退出登录</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { mainList } from "@/configs/index.js";
import { userStore } from "@/store/user.js";
import { ElMessage } from "element-plus";

const list = mainList();
const { userInfo, token, updatePhone, updateToken, updateUserInfo } = userStore();
const router = useRouter();

const handleLogin = () => {
  if (token.value) return;
  router.push("/login");
};
const handleLogout = () => {
  updatePhone('');
  updateToken('');
  updateUserInfo('remove');
  router.push('/login');
  ElMessage.success('退出登录成功')
}
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
  max-height: calc(100vh - 110px);
  overflow-y: auto;
  overflow-x: hidden;
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
    height: calc(100vh - 300px);
    box-sizing: border-box;

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

  .bottom {
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    button {
      display: flex;
      width: 100%;
      height: 50px;
      border: none;
      background-color: #e65353;
      color: #fff;
      justify-content: center;
      align-items: center;
      font-size: large;
      border-radius: 5px;
      &:active {
        background-color: #e6535390;
      }
    }
  }
}
</style>
