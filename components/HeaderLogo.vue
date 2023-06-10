<template>
   <NuxtLink to="/" class="inline-flex h-full cursor-pointer items-center transition ease-in-out hover:scale-105 focus:scale-100">
      <Logo class="shadowed mr-4 h-14" />
      <span class="logo-text font-bold dark:text-white">WEBMARKS</span>
   </NuxtLink>
</template>

<script setup lang="ts">
import { Logo } from './Icons';
</script>