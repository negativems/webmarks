<script setup lang="ts">
import { store } from '~/store/store';

const { bookmarkId } = defineProps(['bookmarkId']);

onMounted(() => {
   document.querySelector('.context-menu')?.classList.add('h-[200px]');
});

</script>

<template>
   <div class="context-menu absolute -bottom-[200px] right-0 z-10 h-0 w-[150px] rounded-lg delay-200 duration-100 dark:bg-accent-dark">
      <div class="flex flex-col gap-2">
         <button
            class="btn btn-primary rounded-t-lg py-2 hover:bg-accent"
         >
            Favorite
         </button>
         <button
            class="btn btn-primary rounded-t-lg py-2 hover:bg-accent"
         >
            Edit
         </button>
         <button class="btn btn-primary py-2 hover:bg-accent">Delete</button>
      </div>
   </div>

   <EditBookmarkModal :bookmark="store.bookmarks.find(b => b.id == bookmarkId)" />
</template>