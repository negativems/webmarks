<script setup lang="ts">
const user = useSupabaseUser();
const client = useSupabaseClient();

definePageMeta({
   layout: 'dashboard',
   // middleware: 'authentication'
});

const search = ref("");
const bookmarks = ref(await getBookmarks(user, client));
const hasBookmarks = computed(() => bookmarks.value.length > 0);

const dragEnter = (e: DragEvent) => {
   e.preventDefault();
   e.stopPropagation();

   // add tailwind class to the body
   document.querySelector('.bookmarks')?.classList.add("bg-red-300");
   document.querySelector('.dark-backround-modal')?.classList.remove("hidden");
};

const dragLeave = (e: DragEvent) => {
   e.preventDefault();
   e.stopPropagation();

   document.querySelector('.bookmarks')?.classList.remove("bg-red-300");
   document.querySelector('.dark-backround-modal')?.classList.add("hidden");
};
</script>

<template>
   <div
      class="bookmarks flex"
      :class="{ 'flex-col gap-10': hasBookmarks, 'justify-center items-center h-full': !hasBookmarks }"
      v-on:dragenter="dragEnter"
      v-on:dragend="dragLeave"
   >
      <DashboardSearchBar
         v-model:search="search"
         v-if="bookmarks.length > 0"
      />

      <DashboardBookmarks :search="search" />

      <div class="no-bookmarks border-8 border-dashed inline-flex flex-col items-center gap-5 rounded-2xl p-10 text-center backdrop-blur-3xl">
         <h2 class="text-2xl font-bold">No bookmarks found</h2>
         <p class="text-gray-500">
            You don't have any bookmarks yet.
            <br>
            Create your first bookmark by clicking the button below or drag and drop here your bookmarks.
         </p>
         <button class="bg-accent text-white font-bold p-3 px-5 rounded-lg gap-5 hover:bg-gray-900 flex items-center justify-center mt-5">
            <span>Create Bookmark</span>
         </button>
      </div>
      <div class="dark-backround-modal bg-black opacity-30 absolute left-0 top-0 w-screen h-screen hidden"></div>
   </div>
</template>