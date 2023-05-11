<script setup lang="ts">
import { ListIcon, GridIcon } from '~/components/Icons';
import { store } from '~/store/store';
</script>

<template>
   <button
      class="rounded-lg px-2 duration-150 hover:scale-110 hover:bg-gray-600"
      @click="store.toggleBookmarkDisplayFormat()"
   >
      <ListIcon v-if="store.bookmarkDisplayFormat === 'rows'"/>
      <GridIcon v-if="store.bookmarkDisplayFormat === 'cards'"/>
   </button>
</template>