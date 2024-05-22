<template>
  <div
    class="inline-flex flex-col items-center gap-5 p-10 text-center border-8 border-dashed no-bookmarks rounded-2xl backdrop-blur-3xl"
    v-if="!hasBookmarks && bookmarkStore.bookmarksLoaded"
  >
    <p class="text-gray-500">
      You did not save any bookmark yet to read later
    </p>
    <button class="flex items-center justify-center gap-5 p-3 px-5 mt-5 font-bold text-white rounded-lg bg-accent hover:bg-neutral-900">
      <span>Create Bookmark</span>
    </button>
  </div>
</template>
<script lang="ts" setup>
import { useBookmark } from "~/store/bookmark";

const bookmarkStore = useBookmark();

defineProps({ hasBookmarks: Boolean });
</script>