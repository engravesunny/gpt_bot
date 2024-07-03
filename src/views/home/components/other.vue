<template>
  <div class="bot-list">
    <div class="bots">
      <Bot
        v-for="bot in OtherList"
        :key="bot.value"
        :avatar="bot.avatar"
        :dsp="bot.dsp"
        :name="bot.label"
      />
    </div>
  </div>
</template>

<script setup>
import { OtherList } from "@/configs";
import Bot from "./bot.vue";
</script>

<style lang="less" scoped></style>
