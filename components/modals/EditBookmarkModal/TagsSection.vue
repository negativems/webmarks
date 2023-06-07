<template>
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
                  @click="handlePencilClick(tag)"
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
                  @blur="editingTag = undefined"
                  @input="handleInput($event)"
                  :class="{
                        'bg-red-300': existsTag,
                     }"
               />
            </div>
         </button>

         <div
            class="hover-buttons flex"
            v-if="newTag !== undefined"
         >
            <input
               class="rounded-md"
               id="tag-input"
               type="text"
               :value="newTag.name"
               @change="handleTagInputChange(newTag, $event)"
               @blur="newTag = undefined"
               @input="handleInput($event)"
               :class="{
                     'bg-red-300': existsTag,
                  }"
            />
         </div>

         <button
            class="inline-flex rounded-lg bg-white text-black"
            @click="handleAddTagClick()"
         >
            <span class="px-2">+</span>
         </button>
      </div>
   </div>
</template>

<script setup lang="ts">
import { PencilIcon, TrashIcon } from '~/components/Icons';
import { useBookmark } from '~/store/bookmark';
import { Bookmark, Tag } from '~/types/types';

const props = defineProps({
   bookmark: {
      type: Object as PropType<Bookmark>,
      required: true,
   }
});

const hoverTag = ref(undefined) as Ref<Tag | undefined>;
const editingTag = ref(undefined) as Ref<Tag | undefined>;
const newTag = ref(undefined) as Ref<Tag | undefined>;

const existsTag = ref(false);

function handleInput(event: any) {
   existsTag.value = useBookmark().existsTag(event.target.value);
}

function handleAddTagClick() {
   // const tag = useBookmark().addTag(props.bookmark.id, 'test');
   newTag.value = {
      name: 'asd',
      color: '#000000',
   } as Tag;
}

function handleDeleteTagClick(tag: Tag) {
   useBookmark().deleteTag(props.bookmark.id, tag.name);
}

function handleTagInputChange(tag: Tag, event: Event) {
   const updatedName = (event.target as HTMLInputElement).value;
   editingTag.value = undefined;
   useBookmark().addTag(props.bookmark.id, updatedName, tag.color);
}

function handleEditTagColorClick(tag: Tag, event: Event) {
   const newColor = (event.target as HTMLInputElement).value;
   useBookmark().updateTag(props.bookmark.id, tag.name, tag.name, newColor);
}

function handlePencilClick(tag: Tag) {
   editingTag.value = tag;

   nextTick(() => {
      document.getElementById('tag-input')?.focus();
   });
}
</script>