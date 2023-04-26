<script setup lang="ts">
const { search } = defineProps(['search']);
const client = useSupabaseClient();
const user = useSupabaseUser();

interface Bookmark {
   id: number;
   title: string;
   description: string;
   url: string;
}

const bookmarks = ref(await getBookmarks(user, client));

/**
 * This function is used to update the bookmarks in the store.
 */
async function updateBookmarks(ref: Ref<Bookmark[]>) {
   const { data } = await client.from('bookmarks').select('id, title, description, url').eq('user_id', user.value?.id).limit(100);
   ref.value = data || [];
}

async function deleteBookmark(id: number, ref?: Ref<Bookmark[]>) {
   const res = await client.from('bookmarks').delete().eq('id', id);
   if (ref) updateBookmarks(ref);
   return res;
}
</script>

<template>
   <div class="bookmarks grid grid-cols-5 gap-5 mb-5">
      <div
         class="bookmark inline-flex"
         v-for="bookmark in bookmarks.filter((bookmark: any) => bookmark.title.toLowerCase().includes(search.toLowerCase()))"
         :key="bookmark.id"
      >
         <div class="grid grid-cols-2 bg-white rounded-xl p-5 gap-5 w-[300px]">
            <div class="col-span-2">
               <h3 class="text-xl font-bold">{{ bookmark.title }}</h3>
               <p class="text-gray-500 break-words">{{ bookmark.description }}</p>
            </div>
            <a
               :href="bookmark.url"
               class="bg-blue-200 text-blue-500 p-3 px-5 hover:bg-accent font-bold rounded-xl flex items-center justify-center max-h-[50px] self-end"
            >
               <span>Go</span>
            </a>
            <button
               class="bg-red-300 text-white font-bold p-3 px-5 rounded-lg gap-5 hover:bg-gray-900 flex items-center justify-center  self-end"
               @click="deleteBookmark(bookmark.id)"
            >
               <span>Delete</span>
            </button>
         </div>
      </div>
   </div>
</template>