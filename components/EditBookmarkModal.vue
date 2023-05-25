<script setup lang="ts">
const { bookmarkId } = defineProps(['bookmarkId']);

console.log(bookmarkId);

</script>

<template>
   <div class="modal-background absolute left-0 top-0 h-full w-full backdrop-blur"></div>
   <div class="modal absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-10 dark:text-red-500">
      <span class="">Editing bookmark {{ bookmarkId }}</span>
   </div>
</template>