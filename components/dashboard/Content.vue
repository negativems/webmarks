<script setup lang="ts">
import { store } from '~/store/store';
import { type Bookmark } from '~/types/types';

const dragEnter = (e: DragEvent) => {
   e.preventDefault();
   e.stopPropagation();
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

const drop = async (e: any) => {
   e.preventDefault();
   e.stopPropagation();

   const plainInput = e.dataTransfer.getData("text/plain");

   document.querySelector('main')?.classList.remove("bg-gray-300");

   if (plainInput.startsWith("http")) {
      const url = e.dataTransfer.getData("text/plain");
      const title = new URL(url).hostname;
      const bookmark: Bookmark = { url, title };
      store.addBookmark(bookmark);
   }
};
</script>

<template>
   <main
      className="dark:bg-gray-800 bg-gray-100 flex-1 rounded-3xl p-10 m-5 h-min-[500px] overflow-auto"
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