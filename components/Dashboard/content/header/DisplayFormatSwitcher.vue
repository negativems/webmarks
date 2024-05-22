<script setup lang="ts">
import { ListIcon, GridIcon } from "~/components/Icons";
import { useBookmark } from "~/store/bookmark";
import type { BookmarkDisplayFormat } from "~/types/types";

const isRows = computed(
	() =>
		useBookmark().bookmarkDisplayFormat === ("rows" as BookmarkDisplayFormat),
);
</script>

<template>
   <button
      class="px-2 duration-150 rounded-lg hover:scale-110 hover:bg-white dark:hover:bg-neutral-600"
      @click="useBookmark().toggleBookmarkDisplayFormat()"
   >
      <ListIcon v-if="!isRows"/>
      <GridIcon v-if="isRows"/>
   </button>
</template>