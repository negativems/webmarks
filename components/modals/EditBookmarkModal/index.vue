<template>
   <VueFinalModal @update:model-value="val => emit('update:modelValue', val)">
      <div class="modal-background absolute left-0 top-0 h-full w-full backdrop-blur"></div>
      <div class="modal absolute left-1/2 top-1/2 flex w-1/2 -translate-x-1/2 -translate-y-1/2 transform flex-col gap-10 rounded-lg bg-neutral-100 p-10 dark:bg-neutral-600">
         <ModalsEditBookmarkModalTitle :title="bookmark.title" />

         <div class="flex flex-row gap-10">
            <ModalsEditBookmarkModalFormInput
               name="title"
               v-model="bookmark.title"
            />
            <ModalsEditBookmarkModalFormInput
               name="URL"
               v-model="bookmark.url"
            />
         </div>
         <div class="flex flex-row">
            <ModalsEditBookmarkModalTagsSection :bookmark="bookmark" class="w-full" />
         </div>

         <div class="buttons flex justify-between">
            <button
               class="rounded-md bg-accent-dark px-5 py-3 drop-shadow-solid-md duration-200 hover:scale-105 hover:drop-shadow-solid-xl"
               @click="handleSaveClick()"
            >
               Save
            </button>

            <button
               v-if="isPro"
               class="rounded-md bg-purple-500 px-5 py-3 drop-shadow-solid-md duration-200 hover:scale-105 hover:drop-shadow-solid-xl focus:bg-purple-600 disabled:cursor-not-allowed"
               @click="handleGenerateTagsClick()"
               :disabled="generatingAI"
            >
               <span v-if="generatingAI">Generating...</span>
               <span v-else>✨ Generate tags</span>
            </button>
         </div>
      </div>
   </VueFinalModal>
</template>
<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';
import { useBookmark } from '~/store/bookmark';
import { useUser } from '~/store/user';
import { Bookmark } from '~/types/types';

const props = defineProps({
   bookmark: {
      type: Object as PropType<Bookmark>,
      required: true,
   }
});

const isPro = computed(() => useUser().isPro);

const emit = defineEmits(['update:modelValue']);

const generatingAI = ref(false);

function saveBookmark() {
   useBookmark().edit(props.bookmark);
}

function handleSaveClick() {
   saveBookmark();
   emit('update:modelValue', false);
}

function handleGenerateTagsClick() {
   // Generate tags using the endpoint /api/ai?url={url}
   // it returns an array of 5 strings
   const url = props.bookmark.url;
   const endpoint = `/api/ai?url=${url}`;

   generatingAI.value = true;
   fetch(endpoint)
      .then(res => res.json())
      .then(data => {
         const tags = data;
         tags.forEach((tag: string) => {
            if (!tag || tag.length === 0) return;

            useBookmark().addTag(props.bookmark.id, tag.toLowerCase(), getRandomPastelColor());
         });

         generatingAI.value = false;
      });
}
</script>