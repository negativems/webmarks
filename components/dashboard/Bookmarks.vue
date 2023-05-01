<script setup lang="ts">
import { store } from '~/store/store';
const { search } = defineProps(['search']);

const user = useSupabaseUser();
const client = useSupabaseClient();

store.bookmarks = user.value !== null ? (await store.getBookmarks(user.value, client)) : [];

</script>

<template>
   <div class="bookmarks mb-5 grid grid-cols-5 gap-5">
      <div
         class="bookmark inline-flex"
         v-for="{ id, title, description, url } in store.bookmarks.filter((bookmark: any) => bookmark.title.toLowerCase().includes(search.toLowerCase()))"
         :key="id"
      >
         <NuxtLink
            :to="url"
            target="_blank"
            class="box-content grid w-[300px] grid-cols-2 gap-5 rounded-xl bg-white p-5 duration-200 hover:scale-105 hover:border-red-300  hover:bg-gray-200 hover:shadow-md"
         >
            <div class="col-span-2">
               <h3 class="text-xl font-bold">{{ title }}</h3>
               <p class="break-words text-gray-500">{{ description }}</p>
            </div>
            <button
               class="flex items-center justify-center gap-5 self-end rounded-lg bg-red-300 p-3 px-5 font-bold text-white  hover:bg-gray-900"
               @click="$event.preventDefault(); store.deleteBookmark(id, user, client)"
            >
               <span>Delete</span>
            </button>
         </NuxtLink>
      </div>
   </div>
</template>