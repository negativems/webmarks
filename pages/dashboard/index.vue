<script setup lang="ts">
import { useBookmark } from '~/store/bookmark';
import { BookmarkDisplayFormat } from '~/types/types';

const bookmarkStore = useBookmark();

definePageMeta({
   layout: 'dashboard',
});

const search = ref("");
const hasBookmarks = computed(() => useBookmark().bookmarks.length > 0);
const displayFormat = computed(() => useBookmark().bookmarkDisplayFormat as BookmarkDisplayFormat);

onMounted(() => {
   bookmarkStore.load();
   bookmarkStore.loadBookmarkDisplayFormat();
});
</script>

<template>
   <div
      class="flex"
      :class="{
         'flex-col gap-10': hasBookmarks,
         'h-full items-center justify-center': !hasBookmarks
      }"
   >
      <header class="flex gap-5">
         <DashboardHeaderSearchBar
            v-model:search="search"
            v-if="hasBookmarks"
         />
         <DashboardHeaderDisplayFormatSwitcher
            :format="displayFormat"
            v-if="hasBookmarks"
         />
      </header>

      <DashboardBookmarks :search="search" />

      <div
         class="no-bookmarks inline-flex flex-col items-center gap-5 rounded-2xl border-8 border-dashed p-10 text-center backdrop-blur-3xl"
         v-if="useBookmark().bookmarksLoaded && !hasBookmarks"
      >
         <h2 class="text-2xl font-bold">No bookmarks found</h2>
         <p class="text-gray-500">
            You don't have any bookmarks yet. <br />
            Start by adding one dragging and dropping a link, a bookmark from your browser or by dragging and dropping a <a href="/">bookmark file</a>.
         </p>
      </div>
   </div>
</template>