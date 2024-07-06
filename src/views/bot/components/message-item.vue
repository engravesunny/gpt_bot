<template>
  <div class="message-item">
    <div v-if="isNew" class="is-new">—以下是新对话—</div>
    <div
      :class="{ bot: !isUser, user: isUser }"
      :style="{ float: isUser ? 'right' : 'left' }"
      class="message-container"
      v-if="type !== 'file'"
      v-html="contentHTML"
    ></div>
    <div
      :class="{ bot: !isUser, user: isUser }"
      class="file-message"
      :style="{ float: isUser ? 'right' : 'left' }"
      v-else
    >
      <div class="icon left">
        <svg
          t="1720159964077"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1537"
          width="200"
          height="200"
        >
          <path
            d="M284.417081 0a166.911207 166.911207 0 0 0-166.911207 166.655208v691.196717A166.655208 166.655208 0 0 0 284.417081 1023.995136h520.445528A166.655208 166.655208 0 0 0 972.797811 856.82793V343.294369a63.2317 63.2317 0 0 0-18.431912-44.799787L673.279234 18.431912A64.511694 64.511694 0 0 0 628.479447 0z"
            fill="#3F70FF"
            p-id="1538"
          ></path>
          <path
            d="M953.341904 298.494582L673.279234 18.431912A63.743697 63.743697 0 0 0 639.999392 1.279994a6.143971 6.143971 0 0 0-7.167966 6.39997v135.423356a195.071073 195.071073 0 0 0 195.071073 195.071074h135.423357a6.143971 6.143971 0 0 0 6.143971-7.167966 61.439708 61.439708 0 0 0-16.127923-32.511846z"
            fill="#2A58D8"
            p-id="1539"
          ></path>
          <path
            d="M835.582463 307.198541h124.671408a55.295737 55.295737 0 0 0-6.911967-8.44796L673.279234 18.431912a71.167662 71.167662 0 0 0-7.679964-6.911967v124.415409A171.007188 171.007188 0 0 0 835.582463 307.198541z"
            fill="#C6E1FF"
            p-id="1540"
          ></path>
          <path
            d="M253.185229 273.918699m33.79184 0l274.942694 0q33.791839 0 33.791839 33.791839l0 0.255999q0 33.791839-33.791839 33.79184l-274.942694 0q-33.791839 0-33.79184-33.79184l0-0.255999q0-33.791839 33.79184-33.791839Z"
            fill="#FFFFFF"
            p-id="1541"
          ></path>
          <path
            d="M253.185229 478.461727m33.79184 0l482.04571 0q33.791839 0 33.79184 33.79184l0 0.255999q0 33.791839-33.79184 33.791839l-482.04571 0q-33.791839 0-33.79184-33.791839l0-0.255999q0-33.791839 33.79184-33.79184Z"
            fill="#FFFFFF"
            p-id="1542"
          ></path>
          <path
            d="M253.185229 683.004756m33.79184 0l482.04571 0q33.791839 0 33.79184 33.791839l0 0.255999q0 33.791839-33.79184 33.791839l-482.04571 0q-33.791839 0-33.79184-33.791839l0-0.255999q0-33.791839 33.79184-33.791839Z"
            fill="#FFFFFF"
            p-id="1543"
          ></path>
        </svg>
      </div>
      <div class="right">
        <div class="fileName">
          {{ content }}
        </div>
        <div class="status">{{ status || "上传中..." }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  role: String,
  content: String,
  isNew: Boolean,
  type: String,
  status: String,
});

const isUser = computed(() => {
  return props.role === "user";
});
const contentHTML = computed(() => {
  return marked.parse(props.content);
});
</script>

<style lang="less" scoped>
.message-item {
  width: 100%;
  word-break: break-all;

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
  .file-message {
    display: flex;
    max-width: 50vw;
    align-items: center;
    gap: 10px;
    .icon {
      width: 40px;
      height: 40px;
    }
    .right {
      width: calc(100% - 50px);
    }
    .fileName {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
