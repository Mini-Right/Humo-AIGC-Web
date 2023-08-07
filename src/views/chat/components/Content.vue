<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
const MessageInput = defineAsyncComponent(() => import('/@/views/chat/components/MessageInput.vue'));
const MessageHistory = defineAsyncComponent(() => import('/@/views/chat/components/MessageHistory.vue'));

</script>
<template>
  <div class="template-container layout-pd">
    <MessageHistory class="message-history" />
    <MessageInput class="message-input" />
  </div>
</template>
<style lang="scss" scoped>
.template-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 250px);
}

.message-history {
  flex: 1;
  overflow: auto;
}

.message-input {
  flex-shrink: 0;
  bottom: 15px;
}
</style>
