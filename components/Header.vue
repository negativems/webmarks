<script setup lang="ts">
const { path } = useRoute();
const isHome = path === '/';

const selected = computed(() => {
   if (path === '/') return '/';
   if (path === '/features') return '/features';
   if (path === '/about') return '/about';
   return '/';
});

const headerLinks = [
   { href: '/', label: 'HOME' },
   { href: '/features', label: 'FEATURES' },
   { href: '/about', label: 'ABOUT' }
] as any;

</script>

<template>
   <header :class="'flex items-center bg-transparent' + (isHome ? ' absolute w-full' : '')">
      <div :class="'container mx-auto flex justify-between items-center h-full px-10 mt-5 box-content bg-white rounded-3xl'">
         <div class="logo-container flex-1 relative h-full">
            <HeaderLogo />
         </div>
         <div class="navbar flex gap-12 flex-1">
            <NuxtLink
               v-for="link in headerLinks"
               :key="link.href"
               :to="link.href"
               :class="'w-full text-center hover:bg-accent-light p-3 rounded-xl ' + (selected === link.href ? 'border-b-4 border-accent rounded-none bg-accent-light' : '')"
               >
                  {{ link.label }}
               </NuxtLink>
         </div>
         <div class="flex-1 flex justify-end">
            <NuxtLink to="/dashboard" class="btn btn-primary border-2 border-accent bg-white hover:shadow-solid-xl duration-150 p-3 rounded-xl">Dashboard</NuxtLink>
         </div>
      </div>
   </header>
</template>