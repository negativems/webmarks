
<script setup>
import { SearchIcon } from '../Icons';

const searchRef = ref('prueba');
defineExpose({ searchRef });
</script>

<template>
   <div class="search-bar inline-flex relative items-center max-w-[300px]">
      <input
         type="text"
         placeholder="Search"
         class="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
         v-model="searchRef"
      />

      <SearchIcon class="absolute right-5" />
   </div>
</template>