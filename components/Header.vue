<template>
   <header
      class="fixed bottom-2 left-1/2 z-20 mt-5 flex w-[90%] -translate-x-1/2 transform items-center text-xs md:static md:bottom-auto md:left-0 md:w-auto md:translate-x-0 md:transform-none md:bg-transparent lg:text-base"
      :class="{
         'md:absolute md:w-full': isHome,
      }"
   >
      <div
         class="container mx-auto box-content flex h-full items-center justify-center gap-2 rounded-full border-2 border-neutral-400 bg-white px-8 dark:bg-black md:justify-between md:gap-12 md:px-10"
         :class="{
               'bg-white': !isHome,
            }"
      >
         <div class="logo-container relative hidden h-full md:block">
            <HeaderLogo />
         </div>
         <div class="navbar flex w-full justify-center gap-2 lg:gap-12">
            <NuxtLink
               v-for="link in headerLinks"
               :key="link.href"
               :to="link.href"
               class="max-w-fit rounded-xl px-5 py-2 text-center font-bold hover:bg-accent-light hover:shadow-md dark:text-white dark:hover:bg-accent-dark md:px-10"
               :class="{
                     'rounded-none border-b-4 border-accent bg-accent-light dark:bg-accent-dark': selected === link.href
                  }"
            >
               {{ link.label }}
            </NuxtLink>
         </div>
         <div
            class="hidden min-w-[fit-content] justify-end md:flex"
            v-if="user"
         >
            <NuxtLink
               to="/dashboard"
               class="btn btn-primary flex items-center gap-3 rounded-xl bg-neutral-100 px-3 py-2 hover:shadow-md dark:bg-neutral-800 "
            >
               <img
                  v-if="user.user_metadata.avatar_url"
                  :src="user.user_metadata.avatar_url"
                  alt="Profile picture"
                  class="h-8 w-8 rounded-full"
               >
               Dashboard
            </NuxtLink>
         </div>

         <div class="color-scheme hidden md:block">
            <ColorSchemeToggle />
         </div>
      </div>
   </header>
</template>

<script setup lang="ts">
const route = useRoute();
const path = ref(route.path);
const isHome = ref(path.value === '/');

const selected = computed(() => {
   if (path.value === '/') {
      return '/';
   } else if (path.value === '/features') {
      return '/features';
   } else if (path.value === '/about') {
      return '/about';
   } else {
      return '';
   }
});

const headerLinks = [
   { href: '/', label: 'HOME' },
   { href: '/features', label: 'FEATURES' },
   { href: 'https://docs.webmarks.io', label: 'DOCS' },
];

const user = useSupabaseUser();

watchEffect(() => {
   path.value = route.path;
   isHome.value = path.value === '/';
});
</script>
