<template>
  <div class="bot-list">
    <div class="bots">
      <bot
        v-for="bot in BotList"
        :key="bot.value"
        :avatar="bot.avatar"
        :dsp="bot.dsp"
        :name="bot.label"
      />
    </div>
  </div>
</template>

<script setup>
import { BotList } from "@/configs";
import bot from "./bot.vue";
</script>

<style lang="less" scoped></style>
