<script setup lang="ts">
import { store } from '~/store/store';
import { BookmarkDisplayFormat } from '~/types/types';

definePageMeta({ layout: 'dashboard' });

const search = ref("");
const hasBookmarks = computed(() => store.bookmarks.length > 0);
const displayFormat = computed(() => store.bookmarkDisplayFormat as BookmarkDisplayFormat);

onMounted(() => {
   store.loadBookmarks({ onlySaveLater: true });
   store.loadBookmarkDisplayFormat();
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
         v-if="!hasBookmarks && store.bookmarksLoaded"
      >
         <p class="text-gray-500">
            You did not save any bookmark yet to read later
         </p>
         <button class="mt-5 flex items-center justify-center gap-5 rounded-lg bg-accent p-3 px-5 font-bold text-white hover:bg-gray-900">
            <span>Create Bookmark</span>
         </button>
      </div>
   </div>
</template>