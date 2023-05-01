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
] as any;

const user = useSupabaseUser();

watchEffect(() => {
   path.value = route.path;
   isHome.value = path.value === '/';
});
</script>

<template>
   <header :class="'flex items-center bg-transparent mt-5 z-10' + (isHome ? ' absolute w-full' : '')">
      <div
         class="container mx-auto box-content flex h-full items-center justify-between gap-12 rounded-3xl px-10 dark:bg-gray-900"
         :class="{
            'bg-white': !isHome,
         }"
      >
         <div class="logo-container relative h-full flex-1">
            <HeaderLogo />
         </div>
         <div class="navbar flex flex-1 gap-12">
            <NuxtLink
               v-for="link in headerLinks"
               :key="link.href"
               :to="link.href"
               class="max-w-fit rounded-xl p-3 px-10 text-center font-bold hover:bg-accent-light hover:shadow-md dark:text-white dark:hover:bg-accent-dark"
               :class="{
                  'rounded-none border-b-4 border-accent bg-accent-light dark:bg-accent-dark': selected === link.href
               }"
            >
               {{ link.label }}
            </NuxtLink>
         </div>
         <div
            class="flex flex-1 justify-end"
            v-if="user"
         >
            <NuxtLink
               to="/dashboard"
               class="btn btn-primary rounded-xl border-2 border-accent bg-white p-3 duration-150 hover:shadow-solid-xl"
            >
               Dashboard
            </NuxtLink>
         </div>

         <div class="color-scheme">
            <ColorSchemeToggle />
         </div>
      </div>
   </header>
</template>