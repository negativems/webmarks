<script setup lang="ts">
import { ListIcon, GridIcon } from '~/components/Icons';
import { useBookmark } from '~/store/bookmark';
import { BookmarkDisplayFormat } from '~/types/types';

const isRows = computed(() => useBookmark().bookmarkDisplayFormat === 'rows' as BookmarkDisplayFormat);
</script>

<template>
   <button
      class="rounded-lg px-2 duration-150 hover:scale-110 hover:bg-gray-600"
      @click="useBookmark().toggleBookmarkDisplayFormat()"
   >
      <ListIcon v-if="isRows"/>
      <GridIcon v-if="!isRows"/>
   </button>
</template>