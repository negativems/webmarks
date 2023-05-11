<script setup lang="ts">
import { Bookmark, BookmarkDisplayFormat } from '~/types/types';
import { store } from '~/store/store';

let prop = defineProps(['search', 'sort']);
const search = computed(() => prop.search as string);
const sort = computed(() => prop.sort as string);

const isRow = computed(() => store.bookmarkDisplayFormat === 'rows' as BookmarkDisplayFormat);

const bookmarks = computed(() => {
   let result = store.bookmarks as Bookmark[];

   if (search.value) {
      const titleIncludes = (bookmark: Bookmark) => bookmark.title.toLowerCase().includes(search.value.toLowerCase());
      const urlIncludes = (bookmark: Bookmark) => bookmark.url.toLowerCase().includes(search.value.toLowerCase());
      result = result.filter((bookmark: any) => titleIncludes(bookmark) || urlIncludes(bookmark));
   }

   if (sort.value === 'redirects') {
      result = result.sort((a, b) => b.redirects - a.redirects);
   } else if (sort.value === 'title') {
      result = result.sort((a, b) => a.title.localeCompare(b.title));
   } else if (sort.value === 'url') {
      result = result.sort((a, b) => a.url.localeCompare(b.url));
   }

   return result;
});

let selectedBookmarkId = ref(undefined as number | undefined);
</script>

<template>
   <div
      class="bookmarks grid gap-5"
      :class="{
         'sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4': isRow,
      }"
   >
      <div
         class="bookmark flex"
         v-for="{ id, title, url, redirects, last_used, tags } in   bookmarks  "
         :key="id"
         @mouseenter="selectedBookmarkId = id"
         @mouseleave="selectedBookmarkId = undefined"
      >
         <NuxtLink
            :to="url"
            target="_blank"
            class="box-content grid w-full grid-cols-12 justify-between gap-5 rounded-xl bg-white p-5 duration-200 hover:scale-[1.01] hover:bg-gray-200 hover:text-accent-dark hover:shadow-md dark:bg-gray-900 dark:hover:bg-black dark:hover:text-accent"
            :class="{
                  'flex-col': isRow,
                  'items-center': !isRow,
               }"
            @click="store.incrementRedirects(id)"
         >
            <div class="col-span-11">
               <h3 class="text-xl font-bold">{{ title }}</h3>
               <p class="break-all text-gray-500">{{ url }}</p>
            </div>
            <div
               class="action-buttons"
               :class="{
                  'col-span-12': isRow,
                  'col-span-1': !isRow,
               }"
               v-if="selectedBookmarkId === id"
            >
               <button
                  class="flex items-center justify-center gap-5 self-end rounded-lg bg-red-500 px-3 py-1 text-xs font-bold text-white duration-150 hover:flex hover:scale-110 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
                  @click="$event.preventDefault(); store.deleteBookmark(id)"
               >
                  <span>Delete</span>
               </button>
            </div>
            <div
               class="tags col-span-12"
               v-if=" tags.length > 0 "
            >
               <span
                  v-for="(     { name, color }, index     ) in      tags     "
                  :key=" index "
                  class="tag mx-1 rounded-full px-2 py-1 text-xs font-bold text-white"
                  :style=" { 'background-color': color } "
               >
                  {{ name }}
               </span>
            </div>
         </NuxtLink>
      </div>
   </div>
</template>