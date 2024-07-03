<template>
  <div class="message-item">
    <div v-if="isNew" class="is-new">—以下是新对话—</div>
    <div
      :class="{ bot: !isUser, user: isUser }"
      :style="{ float: isUser ? 'right' : 'left' }"
      class="message-container"
    >
      {{ content }}
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  role: String,
  content: String,
  isNew: Boolean,
});

const isUser = computed(() => {
  return props.role === "user";
});
</script>

<style lang="less" scoped>
.message-item {
  width: 100%;

  .is-new {
    display: flex;
    justify-content: center;
    padding: 5px 0 15px;
    font-size: 12px;
    font-weight: lighter;
    color: gray;
    letter-spacing: 6px;
  }

  .bot,
  .user {
    max-width: 80%;
    background-color: #fff;
    padding: 12px;
    color: #333;
    border-radius: 10px 10px 10px 0;
    box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, 0.03);
  }

  .user {
    border-radius: 10px 10px 0 10px;
    background-image: linear-gradient(
      45deg,
      rgb(88, 157, 246) 20%,
      rgb(93, 79, 244)
    );
    color: #fff;
    box-shadow: 1px 1px 2px 0 rgba(21, 122, 255, 0.03);
  }
}
</style>
