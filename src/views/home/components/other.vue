<template>
  <div class="bot-list">
    <div class="bots" v-if="OtherList.length">
      <Bot
        v-for="bot in OtherList"
        :key="bot.value"
        :avatar="bot.avatar"
        :dsp="bot.dsp"
        :name="bot.label"
      />
    </div>
    <div class="empty">
      敬请期待～
    </div>
  </div>
</template>

<script setup>
import { OtherList } from "@/configs";
import Bot from "./bot.vue";
</script>

<style lang="less" scoped>
.empty {
  height: calc(100vh - 110px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}
</style>
