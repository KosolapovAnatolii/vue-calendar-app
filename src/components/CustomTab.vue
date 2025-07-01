<script setup>
import { ref } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  onClick: {
    type: Function,
    required: true,
  },
  currentOption: {
    type: String,
    required: false,
  }
})

const activeTab = ref(props.currentOption || props.options[0].value)

function handleClick(option) {
  activeTab.value = option.value
  props.onClick(option.value)
}
</script>

<template>
  <div class="tabs">
    <button
      v-for="option in options"
      :key="option.value"
      :class="['tab-button', { active: option.value === activeTab }]"
      @click="handleClick(option)"
    >
      {{ option.title }}
    </button>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  border-radius: 8px;
  border: 2px solid grey;
  overflow: hidden;
}

.tab-button {
  padding: 8px 16px;
  border: none;
  background-color: #eee;
  cursor: pointer;

  transition: background-color 0.5s;
}
.tab-button.active {
  background-color: #333;
  color: #fff;
}

.tab-button:hover {
  background-color: #ccc;
}
</style>