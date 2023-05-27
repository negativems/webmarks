<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';
import { useBookmark } from '~/store/bookmark';
import { Bookmark, Tag } from '~/types/types';
import { PencilIcon, TrashIcon, CheckIcon } from '~/components/Icons';

// const { bookmark } = defineProps(['bookmark']);

const { bookmark } = defineProps({
   bookmark: {
      type: Object as PropType<Bookmark>,
      required: true,
   }
});

const emit = defineEmits<{
   (e: 'update:modelValue', modelValue: boolean): void
}>();


function addTag() {
   useBookmark().addTag(bookmark.id, 'test');
}

function editTag(tag: Tag) {
   editingTag.value = tag;
}

function deleteTag(tag: Tag) {
   useBookmark().deleteTag(bookmark.id, tag.name);
}

const editingTag = ref(undefined) as Ref<Tag | undefined>;
const hoverTag = ref(undefined) as Ref<Tag | undefined>;
</script>

<template>
   <VueFinalModal @update:model-value="val => emit('update:modelValue', val)">
      <div class="modal-background absolute left-0 top-0 h-full w-full backdrop-blur"></div>
      <div class="modal absolute left-1/2 top-1/2 flex w-1/2 -translate-x-1/2 -translate-y-1/2 transform flex-col gap-10 rounded-lg bg-white p-10 dark:bg-gray-600">
         <span class="text-2xl">
            Editing
            <span class="text-accent">{{ bookmark.title }}</span>
         </span>
         <div class="">
            <label
               class="mb-2 block"
               for="title"
            >
               Title
            </label>
            <input
               class="w-1/2 rounded py-2"
               type="text"
               name="title"
               v-model="bookmark.title"
            >
         </div>
         <div class="">
            <label
               class="mb-2 block"
               for="url"
            >
               URL
            </label>
            <input
               class="w-1/2 rounded py-2"
               type="text"
               name="url"
               :value="bookmark.url"
            >
         </div>
         <div class="">
            <label
               class="mb-2 block"
               for="tags"
            >
               Tags
            </label>
            <div class="tags flex flex-wrap space-x-2">
               <button
                  class="inline-flex rounded-lg text-black"
                  v-for="tag in bookmark.tags"
                  :key="tag.name"
                  :style="{ backgroundColor: tag.color }"
                  @mouseenter="hoverTag = tag"
                  @mouseleave="hoverTag = undefined"
               >
                  <span
                     class="px-5"
                     v-if="hoverTag !== tag && editingTag !== tag"
                  >{{ tag.name }}</span>
                  <div
                     class="hover-buttons flex"
                     v-if="hoverTag == tag && editingTag !== tag"
                  >
                     <button
                        class="flex h-[24px] items-center rounded-l-md bg-red-300 hover:bg-red-500"
                        @click="editTag(tag)"
                     >
                        <PencilIcon class="mx-2" />
                     </button>
                     <button class="flex h-[24px] items-center rounded-r-md bg-red-300 hover:bg-red-500" @click="deleteTag(tag)">
                        <TrashIcon class="mx-2" />
                     </button>
                  </div>

                  <div
                     class="hover-buttons flex"
                     v-if="editingTag == tag"
                  >
                     <input
                        class="rounded-md"
                        type="text"
                        style="width: 80px;"
                        @blur="editingTag = undefined; tag.name = $event.target.value"
                     >
                  </div>
               </button>

               <button
                  class="inline-flex rounded-lg bg-white text-black"
                  @click="addTag()"
               >
                  <span class="px-2">+</span>
               </button>
            </div>
         </div>

         <div class="buttons">
            <button
               class="rounded-md bg-accent-dark px-5 py-3"
               @click="emit('update:modelValue', false)"
            >
               Save
            </button>
         </div>
   </div>
</VueFinalModal></template>