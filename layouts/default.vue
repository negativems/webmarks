<script setup lang="ts">
import { store } from '~/store/store';
const cookieTheme = useCookie('theme').value;

if (cookieTheme && store.theme !== cookieTheme) {
   store.setTheme(cookieTheme);
}

const isDark = computed(() => store.theme === 'dark');

useHead({
   title: 'Webmarks - Bookmark Manager',
   bodyAttrs: {
      class: isDark.value ? 'dark' : 'bg-gray-100',
   },
});
//    const isDarkModePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;
</script>

<template>
   <Header />
   <NuxtPage />
   <Footer />
</template>