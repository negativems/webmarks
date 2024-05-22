<template>
   <div
      class="flex"
      :class="{
         'flex-col gap-10': hasBookmarks,
         'h-full items-center justify-center': !hasBookmarks
      }"
   >
      <header class="flex gap-5">
         <DashboardContentHeaderSearchBar
            v-model:search="search"
            v-if="hasBookmarks"
         />
         <DashboardContentHeaderDisplayFormatSwitcher
            :format="displayFormat"
            v-if="hasBookmarks"
         />
      </header>

      <DashboardContentBookmarks :search="search" />

      <div
         class="inline-flex flex-col items-center gap-5 p-10 text-center border-8 border-dashed no-bookmarks rounded-2xl backdrop-blur-3xl"
         v-if="!hasBookmarks && bookmarkStore.bookmarksLoaded"
      >
         <p class="text-gray-500">
            You didn't use any bookmark yet
            <br>
            Use your first bookmark by clicking on it
         </p>
         <button class="flex items-center justify-center gap-5 p-3 px-5 mt-5 font-bold text-white rounded-lg bg-accent hover:bg-neutral-900">
            <span>Create Bookmark</span>
         </button>
      </div>
   </div>
</template>

<script setup lang="ts">
<<<<<<< Updated upstream
import { useBookmark } from '~/store/bookmark';
import { BookmarkDisplayFormat } from '~/types/types';
=======
import { useBookmark } from "~/store/bookmark";
import type { BookmarkDisplayFormat } from "~/types/types";
>>>>>>> Stashed changes

const bookmarkStore = useBookmark();

definePageMeta({ layout: "dashboard" });

const search = ref("");
const hasBookmarks = computed(() => bookmarkStore.bookmarks.length > 0);
const displayFormat = computed(
	() => bookmarkStore.bookmarkDisplayFormat as BookmarkDisplayFormat,
);

onMounted(() => {
	bookmarkStore.load({ favourite: true });
	bookmarkStore.loadBookmarkDisplayFormat();
});
</script>
