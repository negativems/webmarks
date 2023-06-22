<template>
   <div class="context-menu absolute z-10 h-0 w-[150px] rounded-lg bg-accent-light delay-200 duration-100 dark:bg-accent-dark">
      <div class="flex flex-col gap-2">
         <button
            class="btn btn-primary rounded-t-lg py-2 hover:bg-accent"
            @click="handleFavouriteClick()"
         >
            Favourite
         </button>
         <button
            class="btn btn-primary py-2 hover:bg-accent"
            @click="handleEditClick()"
         >
            Edit
         </button>
         <button
            class="btn btn-primary py-2 hover:bg-accent"
            @click="handleDeleteClick()"
         >
            Delete
         </button>
      </div>
   </div>
</template>

<script setup lang="ts">
import { useBookmark } from '~/store/bookmark';
import { useModal } from 'vue-final-modal';
import { Bookmark } from '~/types/types';
import EditBookmarkModal from '~/components/modals/EditBookmarkModal/index.vue';

const emit = defineEmits(['selectedBookmarkUpdated']);
const props = defineProps(['bookmarkId']);
const bookmark = computed(() => useBookmark().find(props.bookmarkId) as Bookmark);

function deleteContextMenu() {
   emit('selectedBookmarkUpdated', undefined);
}

function handleFavouriteClick() {
   useBookmark().favourite(props.bookmarkId);
}

function handleEditClick() {
   open();
}

function handleDeleteClick() {
   useBookmark().delete(props.bookmarkId);
}

function saveChanges() {
   useBookmark().edit(bookmark.value);
}

const { open, close } = useModal({
   component: EditBookmarkModal,
   attrs: {
      onClosed() {
         saveChanges();
         deleteContextMenu();
      },
      onVnodeBeforeMount() {
         if (bookmark === undefined) {
            deleteContextMenu();
            console.error('Error: Bookmark not found');
         }
      },
      bookmark: bookmark.value,
   },
});

onMounted(() => {
   const contextMenu = document.querySelector('.context-menu') as HTMLElement;
   contextMenu?.classList.add('h-[200px]');

   const contextMenuButtons = contextMenu?.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;

   contextMenuButtons.forEach((button) => {
      button.addEventListener('click', () => {
         if (button.innerText === 'Edit' || button.innerText === 'Delete') {
            contextMenu.classList.add('hidden');
         } else {
            deleteContextMenu();
         }
      });
   });

   document?.addEventListener('contextmenu', (e: any) => {
      const rect = document.querySelector('div.bookmarks')?.getBoundingClientRect();
      contextMenu.style.left = `${e.clientX - rect!.left}px`;
      contextMenu.style.top = `${e.clientY - rect!.top}px`;
   });

   // On click on .modal-background, close the modal
   document.addEventListener('click', (e: any) => {
      if (e.target?.classList.contains('modal-background')) {
         close();
      }
   });
});
</script>
