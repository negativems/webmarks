<script setup lang="ts">
import { Bookmark, BookmarkDisplayFormat } from '~/types/types';
import { store } from '~/store/store';

let ref = defineProps(['search']);
const search = computed(() => ref.search as string);

const isColumn = computed(() => store.bookmarkDisplayFormat === 'columns');

const bookmarks = computed(() => {
   let result = store.bookmarks as Bookmark[];
   if (search.value) {
      result = result.filter((bookmark: any) => bookmark.title.toLowerCase().includes(search.value.toLowerCase()));
   }
   return result;
});
</script>

<template>
   <div
      class="bookmarks grid gap-5"
      :class="{
         'grid-cols-1': !isColumn,
         'grid-cols-5': isColumn,
      }"
   >
      <div
         class="bookmark flex"
         v-for="{ id, title, url } in  bookmarks "
         :key="id"
      >
         <NuxtLink
            :to="url"
            target="_blank"
            class="box-content w-full flex justify-between gap-5 rounded-xl bg-white hover:text-accent p-5 duration-200 hover:scale-[1.01] hover:bg-gray-200 hover:shadow-md dark:bg-gray-900 dark:hover:bg-black"
            :class="{
                  'flex-col': isColumn,
                  'items-center': !isColumn,
               }"
         >
            <div>
               <h3 class="text-xl font-bold">{{ title }}</h3>
               <p class="text-gray-500 break-all">{{ url }}</p>
            </div>
            <div class="action-buttons">
               <button
                  class="flex items-center justify-center gap-5 self-end rounded-lg bg-gray-100 px-3 py-1 text-xs font-bold text-white hover:bg-gray-900 dark:bg-red-600 dark:hover:bg-red-700 hover:scale-110 duration-150"
                  @click="$event.preventDefault(); store.deleteBookmark(id) "
               >
                  <span>Delete</span>
               </button>
            </div>
         </NuxtLink>
      </div>
   </div>
</template>