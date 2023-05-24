<script setup lang="ts">
import { useTheme } from '~/store/themeStore';

const { theme, setTheme } = useTheme();
const cookieTheme = useCookie('theme').value;

if (cookieTheme && theme !== cookieTheme) {
   setTheme(cookieTheme);
}

const isDark = computed(() => theme === 'dark');

useHead({
   title: 'Webmarks - Bookmark Manager',
   bodyAttrs: {
      class: isDark.value ? 'dark' : 'bg-gray-100',
   },
});

// listen route and set theme
watch(
   () => useRoute().path,
   () => {
      if (isDark.value) {
         setTheme('dark');
      } else {
         setTheme('light');
      }
   }
);
</script>

<template>
   <Header />
   <NuxtPage />
   <Footer />
</template>