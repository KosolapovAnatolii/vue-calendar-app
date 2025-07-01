<script setup>
import { ref } from 'vue'
import CustomButton from './CustomButton.vue';

const dialogEl = ref(null)

defineProps({
  title: {
    type: String,
    required: false,
  },
  position: {
    type: Object,
    required: true,
  }
})

const emit = defineEmits(['close'])

defineExpose({ dialogEl })
</script>

<template>
  <div
    ref="dialogEl"
    class="custom-dialog"
    :style="{ top: position.y + 'px', left: position.x + 'px' }"
    @click.stop
  >
    <div class="dialog-wrapper">
      <CustomButton @click="emit('close')" class="dialog-close">
        <i class="fa-regular fa-circle-xmark fa-2xl" style="color: #63E6BE;"></i>
      </CustomButton>
      <h3 v-if="title" class="from-title">{{ title }}</h3>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.custom-dialog {
  position: fixed;
  z-index: 9999;

  background: white;
  box-shadow: 0 8px 24px rgba(30, 30, 30, 0.15);

  border: 2px solid black;
  border-radius: 16px;
}

.dialog-wrapper {
  position: relative;
  padding: 1rem 2rem;
}

.dialog-close {
  position: absolute;
  top: 8px;
  right: 16px;

  width: 28px;
  height: 28px;
  outline: none;
}
</style>