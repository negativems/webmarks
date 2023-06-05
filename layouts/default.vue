<script setup lang="ts">
import { useTheme } from '~/store/themeStore';

// TODO: There is a bug when you change the route, the useHead() method applies the two classes to the body
useHead({
   title: 'Webmarks - Bookmark Manager',
   bodyAttrs: {
      class: useTheme().theme === 'dark' ? 'dark' : 'bg-neutral-100',
   },
});

watch(
   () => useRoute().path,
   () => {
      document.body.classList.toggle('dark', useTheme().theme === 'dark');
      document.body.classList.toggle('bg-neutral-100', useTheme().theme === 'light');
   }
);

</script>

<template>
   <Header />
   <NuxtPage />
   <Footer />
</template>