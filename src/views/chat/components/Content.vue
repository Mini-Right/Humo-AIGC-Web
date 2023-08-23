<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
const MessageInput = defineAsyncComponent(() => import('/@/views/chat/components/MessageInput.vue'));
const MessageHistory = defineAsyncComponent(() => import('/@/views/chat/components/MessageHistory.vue'));
import { inject } from 'vue';
import { HumoChat } from '/@/views/chat/config';
const Chat = inject('Chat') as unknown as HumoChat;
</script>
<template>
  <div class="template-container layout-pd">
    <el-form label-width="auto">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="流式返回" prop="name">
            <el-switch v-model="Chat.IsStream" inline-prompt active-text="是" inactive-text="否" />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="知识库" prop="name">
            <el-switch v-model="Chat.SendMessageForm.is_knowledge" inline-prompt active-text="是" inactive-text="否" />
          </el-form-item>
        </el-col>
      </el-row>



    </el-form>
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
