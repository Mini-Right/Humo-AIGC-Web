<script setup lang="ts">
import { defineAsyncComponent, provide, reactive } from 'vue'
import { HumoChat } from '/@/views/chat/config';
const Content = defineAsyncComponent(() => import('/@/views/chat/components/Content.vue'));
const Chat: HumoChat = reactive(new HumoChat() as any); // as unknown as CustomerService;

provide('Chat', Chat);
</script>
<template>
  <div class="template-container layout-pd">
    <el-container>
      <el-main>
        <el-card shadow="never">
          <Content />
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<style lang="scss" scoped>
</style>
