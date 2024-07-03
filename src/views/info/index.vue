<template>
  <div class="info">
    <div class="nav">
      <div class="title">
        {{ route.query.changeInfo ? "做点改变" : "初次见面~" }}
      </div>
      <div class="skip" @click="router.push('/home')">跳过</div>
    </div>
    <div class="main">
      <div v-for="item in infoList" :key="item.tag" class="main-item">
        <div class="tag">{{ item.tag }}</div>
        <el-input
          v-if="item.key !== 'phone'"
          v-model="item[item.key]"
          type="text"
        />
        <div v-else class="value">{{ user?.phone }}</div>
      </div>
    </div>
    <div class="footer">
      <el-button type="primary" @click="start">
        {{ route.query.changeInfo ? "我改好啦" : "开始体验" }}
      </el-button>
    </div>
  </div>
</template>
<script setup>
import { ElButton, ElInput, ElMessage } from "element-plus";
import { mainList } from "@/configs/index.js";
import { onMounted, ref } from "vue";
import { updateUserInfo } from "@/service/user.js";
import { userStore } from "@/store/user.js";
import { useRoute, useRouter } from "vue-router";

const { updateUserInfo: updateUserStoreInfo, userInfo: user } = userStore();
const router = useRouter();
const route = useRoute();
let infoList = ref(mainList());

onMounted(() => {
  if (route.query.changeInfo) {
    infoList.value = infoList.value.map((item) => {
      item[item.key] = user.value?.[item.key];
      return item;
    });
  }
});

const start = async () => {
  let userInfo = {};
  if (infoList.value.every((info) => !info[info.key])) {
    ElMessage.info("填写信息获得更好的体验，也可以点击跳过哦");
    return;
  }
  infoList.value.forEach((info) => {
    userInfo[info.key] = info[info.key];
  });
  userInfo.phone = user.value.phone;
  try {
    updateUserStoreInfo(userInfo);
    await updateUserInfo(userInfo);
  } catch (err) {
    console.log(err);
  }
  await router.push("/home");
};
</script>

<style lang="less" scoped>
.info {
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  padding: 50px 0 50px;
  box-sizing: border-box;

  .nav {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    box-sizing: border-box;
    padding: 0 20px;

    .title {
      font-size: 25px;
      font-weight: 700;
      color: #333;
    }

    .skip {
      font-size: 18px;
    }
  }

  .main {
    margin-top: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    box-sizing: border-box;
    padding: 10px 5px;
    max-height: 100%;
    overflow-y: scroll;

    .main-item {
      display: flex;
      align-items: center;
      width: 100%;
      font-size: 16px;
      position: relative;
      box-sizing: border-box;
      padding: 20px;

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

  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 20px;

    .el-button {
      padding: 15px 20px;
      height: 40px;
      border-radius: 20px;
    }
  }
}
</style>
