<template>
  <div class="container">
    <NavBar />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import Footer from "./footer/index.vue";
import NavBar from "./nav/index.vue";
import { userStore } from "@/store/user";
import { apiUserInfo } from "@/service/user";
import { onMounted } from "vue";

const { updateUserInfo, phone } = userStore();
onMounted(async () => {
  // 获取用户信息
  const userInfo = await apiUserInfo({
    phone: phone.value,
  });
  updateUserInfo(userInfo);
});
</script>

<style lang="less" scoped>
.container {
  padding: 45px 0 65px;
}
</style>
