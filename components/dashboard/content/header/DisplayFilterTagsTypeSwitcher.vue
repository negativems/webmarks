<script setup lang="ts">
import { FilterIcon } from '~/components/Icons';
import { useBookmark } from '~/store/bookmark';

const isRestrictive = computed(() => useBookmark().bookmarkFilterTagType === 'restrictive');
</script>

<template>
   <button
      class="rounded-lg px-2 duration-150 hover:scale-110 hover:bg-white dark:hover:bg-neutral-600"
      @click="useBookmark().toggleFilterTagType()"
   >
      <FilterIcon v-if="isRestrictive" title="Restrictive"/>
      <FilterIcon v-if="!isRestrictive" color="#4da32f" title="Inclusive"/>
   </button>
</template>