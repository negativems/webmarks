<script setup lang="ts">
const dragEnter = (e: DragEvent) => {
   e.preventDefault();
   e.stopPropagation();
   console.log("Drag enter");

   // add tailwind class to the body
   document.querySelector('main')?.classList.add("bg-red-300");
};

const dragLeave = (e: any) => {
   e.preventDefault();
   e.stopPropagation();
   console.log("Drag leave");

   // First check if the mouse is still inside the main element
   // If it is, don't remove the class
   const main = document.querySelector('main');
   const rect = main?.getBoundingClientRect();
   const x = e.clientX;
   const y = e.clientY;
   if (rect && x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
      return;
   }

   document.querySelector('main')?.classList.remove("bg-red-300");
};

const drop = (e: any) => {
   e.preventDefault();
   e.stopPropagation();

   console.log(e.dataTransfer.getData("text/plain"));

   // Check if the data transfer is not an url and it is a folder
};
</script>

<template>
   <main
      className="bg-gray-100 flex-1 rounded-3xl p-10 m-5 h-min-[500px] overflow-auto"
      @dragenter="dragEnter"
      @dragleave="dragLeave"
      v-on:drop="drop"
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