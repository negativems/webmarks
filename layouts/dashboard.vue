<script setup lang="ts">
import { useTheme } from '~/store/themeStore';
import { Bookmark } from '~/types/types';
import { ModalsContainer } from 'vue-final-modal';

const { theme, setTheme } = useTheme();
const cookieTheme = useCookie('theme').value;

if (cookieTheme && theme !== cookieTheme) {
   setTheme(cookieTheme);
}

useHead({
   title: 'Webmarks - Bookmark Manager',
   bodyAttrs: {
      class: useTheme().isDarkMode ? 'dark' : 'bg-gray-100',
   },
});

</script>

<template>
   <div class="dashboard flex h-screen min-h-[300px] bg-accent-light dark:bg-gray-900">
      <DashboardSideBar />
      <DashboardContent>
         <slot />
      </DashboardContent>

      <ModalsContainer />
   </div>
</template>