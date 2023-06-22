<template>
   <div class="dashboard flex h-screen min-h-[600px] bg-accent-light dark:bg-black">
      <DashboardSidebar />
      <DashboardContent>
         <slot />
      </DashboardContent>

      <ModalsContainer />

      <!-- <notifications group="foo" /> -->
   </div>
</template>

<script setup lang="ts">
import { useTheme } from '~/store/themeStore';
import { ModalsContainer } from 'vue-final-modal';

const { theme, setTheme } = useTheme();
const cookieTheme = useCookie('theme').value;

if (cookieTheme && theme !== cookieTheme) {
   setTheme(cookieTheme);
}

// doNotification();

// function doNotification() {
//    this.$notify({
//       title: 'Welcome to Webmarks!',
//       text: 'This is a bookmark manager that allows you to save your favorite websites.',
//       type: 'success',
//       duration: 10000,
//    });
// }

useHead({
   title: 'Webmarks - Bookmark Manager',
   bodyAttrs: {
      class: useTheme().isDarkMode ? 'dark' : 'bg-neutral-100',
   },
});
</script>