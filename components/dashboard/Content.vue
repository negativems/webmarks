<script setup lang="ts">
import { store } from '~/store/store';
import { type Bookmark } from '~/types/types';

const dragEnter = (e: DragEvent) => {
   e.preventDefault();
   e.stopPropagation();
   // add tailwind class to the body
   document.querySelector('main')?.classList.add("bg-gray-300");
};

const dragLeave = (e: any) => {
   e.preventDefault();
   e.stopPropagation();

   const main = document.querySelector('main');
   const rect = main?.getBoundingClientRect();
   const x = e.clientX;
   const y = e.clientY;
   if (rect && x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
      return;
   }

   document.querySelector('main')?.classList.remove("bg-gray-300");
};

const user = useSupabaseUser();
const client = useSupabaseClient();

const drop = async (e: any) => {
   e.preventDefault();
   e.stopPropagation();

   const plainInput = e.dataTransfer.getData("text/plain");

   document.querySelector('main')?.classList.remove("bg-gray-300");

   // Check if the data transfer is not an url and it is a bookmark folder (not a folder or file)
   if (plainInput.startsWith("http")) {
      const url = e.dataTransfer.getData("text/plain");
      const user_id: string | undefined = user.value?.id ?? undefined;
      const title = new URL(url).hostname.split('.')[0];

      const bookmark: Bookmark = { user_id, url, title };

      store.addBookmark(bookmark, user.value, client);
   }
};
</script>

<template>
   <main
      className="bg-gray-100 flex-1 rounded-3xl p-10 m-5 h-min-[500px] overflow-auto"
      @dragenter="dragEnter"
      @dragleave="dragLeave"
      @drop="drop"
      @dragover="e => e.preventDefault()"
   >
      <slot />
   </main>
</template>

<style scoped>
::-webkit-scrollbar-track {
   margin: 20px 0px;
}
</style>