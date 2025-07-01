<script setup>
const props = defineProps({
  type: {
    type: String,
    required: false,
    default: 'button'
  },
})

const emit = defineEmits(['click']);
</script>

<template>
  <button
    :type="type"
    @click="emit('click')"
    class="custom-button"
  >
    <slot />
  </button>
</template>

<style scoped>
.custom-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;

  font-size: 16px;
  color: grey;
  transition: color 0.5s ease;
}

.custom-button:hover {
  color: orange;
}
</style>