<script setup lang="ts">
import { Bookmark, BookmarkDisplayFormat } from '~/types/types';
import { store } from '~/store/store';

let ref = defineProps(['search']);
const search = computed(() => ref.search as string);

const isColumn = computed(() => store.bookmarkDisplayFormat === 'columns' as BookmarkDisplayFormat);

const bookmarks = computed(() => {
   let result = store.bookmarks as Bookmark[];

   if (search.value) {
      const titleIncludes = (bookmark: Bookmark) => bookmark.title.toLowerCase().includes(search.value.toLowerCase());
      const urlIncludes = (bookmark: Bookmark) => bookmark.url.toLowerCase().includes(search.value.toLowerCase());
      result = result.filter((bookmark: any) => titleIncludes(bookmark) || urlIncludes(bookmark));
   }

   return result;
});
</script>

<template>
   <div
      class="bookmarks grid gap-5"
      :class="{
         'sm:grid-cols-6 md:grid-cols-4 xl:grid-cols-6': isColumn,
      }"
   >
      <div
         class="bookmark flex"
         v-for="{ id, title, url } in bookmarks"
         :key="id"
      >
         <NuxtLink
            :to="url"
            target="_blank"
            class="box-content flex w-full justify-between gap-5 rounded-xl bg-white p-5 duration-200 hover:scale-[1.01] hover:bg-gray-200 hover:text-accent-dark hover:shadow-md dark:bg-gray-900 dark:hover:bg-black dark:hover:text-accent"
            :class="{
                  'flex-col': isColumn,
                  'items-center': !isColumn,
               }"
         >
            <div>
               <h3 class="text-xl font-bold">{{ title }}</h3>
               <p class="break-all text-gray-500">{{ url }}</p>
            </div>
            <div class="action-buttons">
               <button
                  class="flex items-center justify-center gap-5 self-end rounded-lg bg-red-500 px-3 py-1 text-xs font-bold text-white duration-150 hover:scale-110 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
                  @click="$event.preventDefault(); store.deleteBookmark(id)"
               >
                  <span>Delete</span>
               </button>
            </div>
         </NuxtLink>
      </div>
   </div>
</template>