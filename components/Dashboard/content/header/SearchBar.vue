<script setup>
import { SearchIcon } from "~/components/Icons";
</script>

<template>
   <div class="search-bar relative inline-flex max-w-[300px] items-center">
      <input
         type="text"
         placeholder="Search"
         class="h-10 w-full rounded-lg border-2 border-gray-300 bg-white px-5 pr-16 text-sm text-black focus:outline-none"
         @input="$emit('update:search', $event.target.value)"
      />

      <SearchIcon class="absolute right-5" />
   </div>
</template>