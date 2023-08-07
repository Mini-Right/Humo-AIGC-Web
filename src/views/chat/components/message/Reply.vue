<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { AvatarEnum } from '/@/views/chat/config';

const props = defineProps({
  message: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: true,
  },
});
const MarkdownRender = defineAsyncComponent(() => import('/@/components/markdown/MarkdownRenderer.vue'));
</script>
<template>
  <div class="flex overflow-hidden mb20">
    <div>
      <el-avatar shape="circle" :size="50" :src="AvatarEnum.Bot" />
    </div>
    <div v-loading="props.loading" class="ml10">
      <div style="background-color: #f4f6f8; padding: 10px">
        <MarkdownRender :content="props.message" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.flex-row-reverse {
  flex-direction: row-reverse;
}
</style>
