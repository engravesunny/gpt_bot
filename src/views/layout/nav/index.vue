<template>
  <div class="nav">
    <div v-if="isHome" class="home">
      <div class="tags">
        <div
          v-for="tag in HomeTags"
          :key="tag.path"
          :class="{ active: curHomePage === tag.value }"
          class="tag"
          @click="handleHomeJumpTo(tag.path, tag.value)"
        >
          {{ tag.label }}
        </div>
      </div>
    </div>
    <div v-else class="user">我的</div>
  </div>
</template>

<script setup>
import { HomeTags } from "@/configs";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const curHomePage = ref(
  route.path.includes("/home/bot") ? "home_bot" : "home_other",
);
const isHome = computed(() => {
  return route.path.includes("/home");
});
const handleHomeJumpTo = (path, value) => {
  curHomePage.value = value;
  router.push(path);
};
</script>

<style lang="less" scoped>
@keyframes active {
  0% {
    transform: translate(-50%) scaleX(0);
  }
  100% {
    transform: translate(-50%) scaleX(1);
  }
}

.nav {
  height: 45px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.1);

  .home {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .tags {
      display: flex;
      align-items: center;
      gap: 40px;

      .tag {
        min-width: 40px;
        display: flex;
        justify-content: center;
        font-size: 16px;
        font-weight: normal;
        color: rgb(90, 97, 112);
      }

      .active {
        position: relative;
        font-size: 20px;
        transition: all 0.15s ease-in;
        font-weight: 700;
        color: #333;

        &::after {
          content: "";
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translate(-50%);
          width: 40%;
          height: 3px;
          border-radius: 3px;
          background-color: #333;
          animation: active 0.3s ease-in;
        }
      }
    }
  }

  .user {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 20px;
    color: #333;
    font-weight: 700;
  }
}
</style>
