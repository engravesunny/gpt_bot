<template>
  <div class="bot-list">
    <div class="bots">
      <Bot
        v-for="bot in BotList"
        :key="bot.value"
        :avatar="bot.avatar"
        :dsp="bot.dsp"
        :name="bot.label"
        :value="bot.value"
      />
    </div>
  </div>
</template>

<script setup>
import { BotList } from "@/configs";
import Bot from "./bot.vue";
</script>

<style lang="less" scoped></style>
