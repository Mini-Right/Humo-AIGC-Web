<script setup lang="ts">
import { inject } from 'vue';
import { Position } from '@element-plus/icons-vue';
import { HumoChat } from '/@/views/chat/config';
const Chat = inject('Chat') as unknown as HumoChat;
</script>
<template>
  <div class="message-input">
    <el-input v-model="Chat.SendMessageForm.message" ref="inputRef" :autosize="{ minRows: 2, maxRows: 10 }"
      type="textarea" placeholder="说点什么吧" :disabled="Chat.MessagePredictLoading" />
    <el-button class="ml10" type="success" plain :icon="Position" :disabled="Chat.MessagePredictLoading"
      style="width: 40px; height: 100%" @click="Chat.Predict" />
  </div>
</template>
<style lang="scss" scoped>
.message-input {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
