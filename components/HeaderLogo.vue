<template>
   <NuxtLink
      to="/"
      class="inline-flex h-full cursor-pointer items-center transition ease-in-out hover:scale-105 focus:scale-100"
   >
      <Logo class="shadowed mr-4 h-14" />
      <span
         class="logo-text hidden font-bold dark:text-white lg:block"
      >WEBMARKS</span>
   </NuxtLink>
</template>

<script setup lang="ts">
import { Logo } from './Icons';
</script>