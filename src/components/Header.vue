<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CustomTab from './CustomTab.vue';

defineProps({
  onLangCange: {
    type: Function,
    required: true,
  },
  currentLang: {
    type: String,
    required: false,
  }
})

const { t } = useI18n()

const langOptions = ref([
  {
    title: 'Eng',
    value: 'en',
  },
  {
    title: 'Ukr',
    value: 'uk',
  }
])
</script>

<template>
  <header class="header">
    <h2 class="header-title">{{ t('calendar') }}</h2>
    <CustomTab
      :options="langOptions"
      :currentOption="currentLang"
      :onClick="onLangCange"
    />
  </header>
</template>

<style scoped>
.header {
  border-bottom: 1px solid black;
  padding: 1rem;

  display: flex;
  justify-content: space-between;
}

.header-title {
  margin: 0;
}
</style>