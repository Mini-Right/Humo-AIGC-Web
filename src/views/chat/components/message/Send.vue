<script setup lang="ts">
import { AvatarEnum } from '/@/views/chat/config';
const props = defineProps({
  message: {
    type: String,
    default: '',
  },
});

const formatText = (text: string) => {
  return text.replace(/\n/g, '\n  ');
}
</script>
<template>
  <div class="flex overflow-hidden mb20 flex-row-reverse">
    <div>
      <el-avatar shape="circle" :size="50" :src="AvatarEnum.User" />
    </div>
    <div class="mr10">
      <div style="background-color: #f4f6f8; padding: 10px">
        <pre class="formatted-text">{{ formatText(props.message) }}</pre>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.flex-row-reverse {
  flex-direction: row-reverse;
}

.formatted-text {
  white-space: pre;
  font-family: inherit;
  font-size: inherit;

}
</style>
