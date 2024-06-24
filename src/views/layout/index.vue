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
</script>

<style lang="less" scoped>
.container {
  padding: 45px 0 55px;
}
</style>
