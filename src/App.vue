<script setup>
import { ref, onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'
import Calendar from './components/Calendar.vue'
import Header from './components/Header.vue'

const { locale } = useI18n()

const currentLang = ref('en');

function setLang(value) {
  currentLang.value = value;
  locale.value = value;
  localStorage.setItem('app_lang', value)
}

onBeforeMount(() => {
  const lang = localStorage.getItem('app_lang')
  if (lang) {
    currentLang.value = lang;
    locale.value = lang;
  }
})
</script>

<template>
  <div class="app">
    <Header :onLangCange="setLang" :currentLang="currentLang"/>
    <Calendar :userLang="currentLang"/>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
}
</style>