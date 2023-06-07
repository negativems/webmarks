<template>
   <header
      class="z-10 mt-5 flex items-center bg-transparent"
      :class="{
         'absolute w-full': isHome,
      }"
   >
      <div
         class="container mx-auto box-content flex h-full items-center justify-between gap-12 rounded-3xl px-10 dark:bg-neutral-900"
         :class="{
               'bg-white': !isHome,
            }"
      >
         <div class="logo-container relative h-full flex-1">
            <HeaderLogo class="scale-75"/>
         </div>
         <div class="navbar hidden flex-1 gap-12 md:flex">
            <NuxtLink
               v-for="link in headerLinks"
               :key="link.href"
               :to="link.href"
               class="max-w-fit rounded-xl px-10 py-2 text-center font-bold hover:bg-accent-light hover:shadow-md dark:text-white dark:hover:bg-accent-dark"
               :class="{
                     'rounded-none border-b-4 border-accent bg-accent-light dark:bg-accent-dark': selected === link.href
                  }"
            >
               {{ link.label }}
            </NuxtLink>
         </div>
         <div
            class="hidden flex-1 justify-end md:flex"
            v-if="user"
         >
            <NuxtLink
               to="/dashboard"
               class="btn btn-primary rounded-xl border-2 border-accent bg-white px-3 py-2 duration-150 hover:shadow-solid-xl dark:bg-neutral-700"
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
];

const user = useSupabaseUser();

watchEffect(() => {
   path.value = route.path;
   isHome.value = path.value === '/';
});
</script>
