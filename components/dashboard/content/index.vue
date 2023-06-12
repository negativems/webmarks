<template>
   <main
      className="dark:bg-neutral-800 bg-neutral-100 flex-1 rounded-3xl p-5 md:p-10 m-5 h-min-[500px] overflow-auto"
      @dragenter.stop.prevent="dragEnter"
      @dragleave.stop.prevent="dragLeave"
      @drop.stop.prevent="drop"
      @dragover.prevent=""
   >
      <slot />
   </main>
</template>

<script setup lang="ts">
import { useBookmark } from '~/store/bookmark';
import { BookmarkDraft } from '~/types/types';

const bookmarkStore = useBookmark();

const dragEnter = (event: DragEvent) => {
   document.querySelector('main')?.classList.add("bg-neutral-300");
};

const dragLeave = (event: any) => {
   const main = document.querySelector('main');
   const rect = main?.getBoundingClientRect();
   const x = event.clientX;
   const y = event.clientY;
   if (rect && x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
      return;
   }

   document.querySelector('main')?.classList.remove("bg-neutral-300");
};

/**
 * Handles the drop event to add a bookmark
 * or add a bookmark export file
 */
const drop = async (e: any) => {
   document.querySelector('main')?.classList.remove("bg-neutral-300");

   // Check if the data being dragged is a URL or a file
   const urlInput = e.dataTransfer.getData("URL");
   if (urlInput) {
      const url = e.dataTransfer.getData("URL");
      const title = new URL(url).hostname;
      const bookmark: BookmarkDraft = { url, title, last_used: new Date() };
      bookmarkStore.add(bookmark);
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
      const bookmarks: BookmarkDraft[] = [];

      links.forEach((link) => {
         const url = link.href;
         const title = link.innerText;
         if (url && title) {
            bookmarks.push({ url, title, redirects: 0, last_used: new Date() });
         }
      });

      bookmarkStore.addMultiple(bookmarks);
   };

   reader.readAsText(file);
};
</script>

<style scoped>
::-webkit-scrollbar-track {
   margin: 20px 0px;
}
</style>