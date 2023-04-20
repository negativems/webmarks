<script setup lang="ts">
definePageMeta({
   layout: 'dashboard',
   // middleware: 'authentication'
});

const client = useSupabaseClient();
const user = useSupabaseUser();

const getBookmarks = async () => {
   const { data } = await client.from('bookmarks').select('id, title, description, url').eq('user_id', user.value?.id).limit(100);

   return data;
};

const bookmarks = ref(await getBookmarks());

async function updateBookmarks() {
   const { data } = await client.from('bookmarks').select('id, title, description, url').eq('user_id', user.value?.id).limit(100);

   bookmarks.value = data;
}

async function addBookmark() {
   const userId = user.value?.id;
   const websites = this.websites.map((w: any) => ({ title: w.name, description: w.description, url: w.url, user_id: userId }));
   const { data } = await client.from('bookmarks').insert(websites);

   return data;
}

async function deleteBookmark(id: number) {
   console.log("Tried to delete bookmark " + id);
   const res = await client.from('bookmarks').delete().eq('id', id);

   updateBookmarks();
   return res;
}

</script>

<template>
   <div class="bookmarks">
      <!-- tailwind table -->
      <table class="table-auto w-full">
         <thead>
            <tr>
               <th class="px-4 py-2">Title</th>
               <th class="px-4 py-2">Description</th>
               <th class="px-4 py-2">URL</th>
               <th class="px-4 py-2">Actions</th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="bookmark in bookmarks" :key="bookmark.id">
               <td class="border px-4 py-2">{{ bookmark.title }}</td>
               <td class="border px-4 py-2">{{ bookmark.description }}</td>
               <td class="border px-4 py-2">{{ bookmark.url }}</td>
               <td class="border px-4 py-2">
                  <button class="bg-red-400 text-white font-bold p-2 rounded-lg flex justify-center gap-5 hover:bg-gray-900" @click="deleteBookmark(bookmark.id)">
                     Delete
                  </button>
               </td>
            </tr>
         </tbody>
      </table>
   </div>

   <button class="login-button w-full bg-red-400 text-white font-bold p-5 rounded-lg flex justify-center gap-5 hover:bg-gray-900 justify-self-end" @click="addBookmark()">
      Add bookmark
   </button>
</template>