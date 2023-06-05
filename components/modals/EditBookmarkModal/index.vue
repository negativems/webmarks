<template>
   <VueFinalModal @update:model-value="val => emit('update:modelValue', val)">
      <div class="modal-background absolute left-0 top-0 h-full w-full backdrop-blur"></div>
      <div class="modal absolute left-1/2 top-1/2 flex w-1/2 -translate-x-1/2 -translate-y-1/2 transform flex-col gap-10 rounded-lg bg-neutral-100 p-10 dark:bg-neutral-600">
         <ModalsEditBookmarkModalTitle :title="bookmark.title" />

         <div class="">
            <!-- <ModalsEditBookmarkModalFormInput name="title" v-model:modelValue="bookmark.title" /> -->

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
                  class="relative inline-flex rounded-lg text-black"
                  v-for="tag in bookmark.tags"
                  :key="tag.name"
                  @mouseenter="editingTag == undefined ? hoverTag = tag : undefined"
                  @mouseleave="editingTag == undefined ? hoverTag = undefined : undefined"
               >
                  <span
                     class="rounded-lg px-5"
                     :style="{ backgroundColor: tag.color, color: getColorByBgColor(tag.color) }"
                     v-if="editingTag !== tag"
                  >
                     {{ tag.name }}
                  </span>
                  <div
                     class="hover-buttons flex"
                     v-if="hoverTag === tag && editingTag !== tag"
                  >
                     <button
                        class="edit-button absolute left-0 h-[24px] w-1/3 items-center rounded-l-md bg-accent-light hover:bg-accent"
                        @click="handleEditTagClick(tag)"
                     >
                        <PencilIcon class="mx-auto" />
                     </button>
                     <input
                        class="absolute left-1/2 h-[24px] w-1/3 -translate-x-1/2 transform items-center bg-accent-light text-center hover:bg-accent"
                        type="color"
                        :value="tag.color"
                        @change="handleEditTagColorClick(tag, $event)"
                     />
                     <button
                        class="absolute right-0 h-[24px] w-1/3 items-center rounded-r-md bg-accent-light hover:bg-accent"
                        @click="handleDeleteTagClick(tag)"
                     >
                        <TrashIcon class="mx-auto" />
                     </button>
                  </div>

                  <div
                     class="hover-buttons flex"
                     v-if="editingTag == tag"
                  >
                     <input
                        class="rounded-md"
                        id="tag-input"
                        type="text"
                        :value="tag.name"
                        @change="handleTagInputChange(tag, $event)"
                     >
                  </div>
               </button>

               <button
                  class="inline-flex rounded-lg bg-white text-black"
                  @click="handleAddTagClick()"
               >
                  <span class="px-2">+</span>
               </button>
            </div>
         </div>

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
import { Bookmark, Tag } from '~/types/types';
import { PencilIcon, TrashIcon } from '~/components/Icons';

const props = defineProps({
   bookmark: {
      type: Object as PropType<Bookmark>,
      required: true,
   }
});

const emit = defineEmits(['update:modelValue']);

const editingTag = ref(undefined) as Ref<Tag | undefined>;
const hoverTag = ref(undefined) as Ref<Tag | undefined>;

function handleAddTagClick() {
   const tag = useBookmark().addTag(props.bookmark.id, 'test');
   handleEditTagClick(tag as Tag);
}

function handleEditTagClick(tag: Tag) {
   editingTag.value = tag;

   nextTick(() => {
      document.getElementById('tag-input')?.focus();
   });
}

function handleDeleteTagClick(tag: Tag) {
   useBookmark().deleteTag(props.bookmark.id, tag.name);
}

function handleTagInputChange(tag: Tag, event: Event) {
   const updatedName = (event.target as HTMLInputElement).value;
   editingTag.value = undefined;
   // useBookmark().updateTag(bookmark.id, tag.name, updatedName, tag.color);

   // props.bookmark.tags = props.bookmark.tags.map(tag => {
   //    if (tag.name === tag.name) {
   //       console.log("Se ha encontrado un tag con el mismo nombre");
   //       tag.name = updatedName;
   //    } else {
   //       console.log("No se ha encontrado un tag con el mismo nombre");
   //    }

   //    return tag;
   // });
}

function handleEditTagColorClick(tag: Tag, event: Event) {
   const newColor = (event.target as HTMLInputElement).value;
   useBookmark().updateTag(props.bookmark.id, tag.name, tag.name, newColor);
}

function saveBookmark() {
   useBookmark().edit(props.bookmark);
}

function handleSaveClick() {
   saveBookmark();
   emit('update:modelValue', false);
}
</script>