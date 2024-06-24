<template>
  <div class="home">
    <RenderComponent />
  </div>
</template>

<script setup>
import { HomeTags } from "@/configs";
import { useRoute } from "vue-router";
import { computed, onMounted } from "vue";
const route = useRoute();
const RenderComponent = computed(() => {
  return HomeTags.find((tag) => tag.path === route.path).component;
});
onMounted(() => {
  console.log(RenderComponent);
});
</script>

<style lang="less" scoped></style>
