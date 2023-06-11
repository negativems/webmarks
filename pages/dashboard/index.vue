<template>
   <div
      class="flex"
      :class="{
         'flex-col gap-10': hasBookmarks,
         'h-full items-center justify-center': !hasBookmarks
      }"
   >
      <DashboardContentBookmarksHeader
         class="header flex gap-5"
         v-if="hasBookmarks"
         v-model:search="search"
         :hasBookmarks="hasBookmarks"
         :format="displayFormat"
         :filterTagsType="filterTagsType"
      />

      <DashboardContentBookmarks :search="search" />

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
const filterTagsType = computed(() => useBookmark().bookmarkFilterTagType);

onMounted(() => {
   bookmarkStore.load();
   bookmarkStore.loadBookmarkDisplayFormat();
   bookmarkStore.loadBookmarkFilterTagType();
});
</script>
