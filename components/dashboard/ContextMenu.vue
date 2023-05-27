<script setup lang="ts">
import { useBookmark } from '~/store/bookmark';
import { useModal } from 'vue-final-modal';
import EditBookmarkModal from '../EditBookmarkModal.vue';
import { Bookmark } from '~/types/types';

const { bookmarkId } = defineProps(['bookmarkId']);

onMounted(() => {
   const contextMenu = document.querySelector('.context-menu') as HTMLElement;
   contextMenu?.classList.add('h-[200px]');

   const buttons = contextMenu?.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;

   buttons.forEach((button) => {
      button.addEventListener('click', () => {
         if (button.innerText === 'Edit') {
            contextMenu.classList.add('hidden');
         } else {
            deleteContextMenu();
         }
      });
   });

   document.addEventListener('contextmenu', (e) => {
      contextMenu.style.top = `${e.clientY}px`;
      contextMenu.style.left = `${e.clientX}px`;
   });

   // On click on .modal-background, close the modal
   document.addEventListener('click', (e: any) => {
      if (e.target?.classList.contains('modal-background')) {
         deleteContextMenu();
      }
   });
});

const emit = defineEmits(['selectedBookmarkUpdated']);
function deleteContextMenu() {
   emit('selectedBookmarkUpdated', undefined);
}

const { open } = useModal({
   component: EditBookmarkModal,
   attrs: {
      title: 'Hello World!',
      onClosed() {
         deleteContextMenu();
      },
      onVnodeBeforeMount() {
         if (useBookmark().find(bookmarkId) === undefined) {
            deleteContextMenu();
            console.error('Error: Bookmark not found');
         }
      },
      bookmark: useBookmark().find(bookmarkId) as Bookmark
   },
});

</script>

<template>
   <div class="context-menu absolute z-10 h-0 w-[150px] rounded-lg delay-200 duration-100 dark:bg-accent-dark">
      <div class="flex flex-col gap-2">
         <button
            class="btn btn-primary rounded-t-lg py-2 hover:bg-accent"
            @click="useBookmark().favourite(bookmarkId)"
         >
            Favourite
         </button>
         <button
            class="btn btn-primary rounded-t-lg py-2 hover:bg-accent"
            @click="open"
         >
            Edit
         </button>
         <button
            class="btn btn-primary py-2 hover:bg-accent"
            @click="useBookmark().delete(bookmarkId)"
         >
            Delete
         </button>
      </div>
   </div>
</template>