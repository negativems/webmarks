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

/**
 * Handles the drop event to add a bookmark
 * or add a bookmark export file
 */
const drop = async (e: any) => {
   e.preventDefault();
   e.stopPropagation();

   // Check if the data being dragged is a URL or a file
   const urlInput = e.dataTransfer.getData("URL");
   if (urlInput) {
      const url = e.dataTransfer.getData("URL");
      const title = new URL(url).hostname;
      const bookmark: Bookmark = { url, title, redirects: 0, last_used: new Date() };
      store.addBookmark(bookmark);
      return;
   }

   const file = e.dataTransfer.files[0];
   if (!file) return;

   // Check if the file is an html file
   const reader = new FileReader();
   reader.onload = async (e) => {
      const html = e.target?.result;
      if (!html) return;

      const parser = new DOMParser();
      const doc = parser.parseFromString(html as string, "text/html");
      const links = doc.querySelectorAll("a");
      const bookmarks: Bookmark[] = [];

      links.forEach((link) => {
         const url = link.href;
         const title = link.innerText;
         if (url && title) {
            bookmarks.push({ url, title, redirects: 0, last_used: new Date() });
         }
      });

      store.bookmarks = store.bookmarks.concat(bookmarks);
   };

   reader.readAsText(file);
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