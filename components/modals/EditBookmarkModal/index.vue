<template>
   <VueFinalModal @update:model-value="val => emit('update:modelValue', val)">
      <div class="modal-background absolute left-0 top-0 h-full w-full backdrop-blur"></div>
      <div class="modal absolute left-1/2 top-1/2 flex w-1/2 -translate-x-1/2 -translate-y-1/2 transform flex-col gap-10 rounded-lg bg-neutral-100 p-10 dark:bg-neutral-600">
         <ModalsEditBookmarkModalTitle :title="bookmark.title" />
         
         <ModalsEditBookmarkModalFormInput name="title" v-model="bookmark.title"/>
         <ModalsEditBookmarkModalFormInput name="URL" v-model="bookmark.url"/>

         <ModalsEditBookmarkModalTagsSection :bookmark="bookmark"/>

         <div class="buttons">
            <button
               class="rounded-md bg-accent-dark px-5 py-3"
               @click="handleSaveClick()"
            >
               Save
            </button>
         </div>
      </div>
   </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';
import { useBookmark } from '~/store/bookmark';
import { Bookmark } from '~/types/types';

const props = defineProps({
   bookmark: {
      type: Object as PropType<Bookmark>,
      required: true,
   }
});

const emit = defineEmits(['update:modelValue']);

function saveBookmark() {
   useBookmark().edit(props.bookmark);
}

function handleSaveClick() {
   saveBookmark();
   emit('update:modelValue', false);
}
</script>