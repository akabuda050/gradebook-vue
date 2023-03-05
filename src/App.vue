<template>
  <MainPage />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import MainPage from './pages/MainPage.vue';

onMounted(() => {
  document.getElementsByTagName('body')[0].classList.add('bg-sky-100');
})
</script>
