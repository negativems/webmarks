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
</script>

<template>
   <div class="dashboard flex h-screen min-h-[300px] bg-accent-light dark:bg-gray-900">
      <DashboardSideBar />
      <DashboardContent>
         <slot />
      </DashboardContent>
   </div>
</template>