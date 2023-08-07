<script setup lang="ts">
import { inject, defineAsyncComponent } from 'vue'
import { HumoChat } from '/@/views/chat/config';
const Chat = inject('Chat') as unknown as HumoChat;

const Send = defineAsyncComponent(() => import('/@/views/chat/components/message/Send.vue'));
const Reply = defineAsyncComponent(() => import('/@/views/chat/components/message/Reply.vue'));

</script>
<template>
  <div class="template-container layout-pd">
    <div v-for="(item, index) in Chat.MessageHistoryList" :key="index">
      <Send v-if="item.role === 'user'" :message="item.message" />
      <Reply v-if="item.role === 'assistant'" :message="item.message" :loading="item.loading" :chat_index="index" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>
