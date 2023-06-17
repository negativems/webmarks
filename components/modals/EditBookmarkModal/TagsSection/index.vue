<template>
   <div class="">
      <label
         class="mb-2 block"
         for="tags"
      >
         Tags
      </label>
      <div class="tags flex flex-wrap gap-2">
         <TagButton
            v-for="tag in bookmark.tags"
            :bookmark="bookmark"
            :tag="tag"
            :isEditing="editingTag === tag"
            :isHover="hoverTag === tag"
            @hoverTag="hoverTag = $event"
            @editingTag="handleEditingTag(tag)"
         />

         <div
            class="relative flex"
            v-if="newTag !== undefined"
         >
            <input
               class="rounded-md border-2 px-2 outline-none"
               id="tag-input"
               type="text"
               v-model="newTag.name"
               @input="handleTagInput($event)"
               @keydown.enter="handleTagInputAdd(newTag, $event)"
               @keydown.esc="newTag = undefined"
            />
            <div class="tag-selector absolute top-8 z-10 max-h-[200px] w-full overflow-y-scroll rounded-md bg-white text-black">
               <ul>
                  <li
                     v-for="tag in availableTags.filter(tag => tag.name.includes(newTagInput))"
                     :key="tag.name"
                     class="px-2 hover:cursor-default hover:bg-accent"
                     :class="{
                           'bg-accent-light': bookmark.tags.includes(tag),
                        }"
                     @click="handleTagSelectorClick(tag)"
                  >
                     {{ tag.name }}
                  </li>
               </ul>
            </div>
         </div>

         <button
            class="inline-flex rounded-lg bg-white text-black"
            @click="handleAddTagButtonClick()"
         >
            <span class="px-2">+</span>
         </button>
      </div>
   </div>
</template>

<script setup lang="ts">
import { useBookmark } from '~/store/bookmark';
import { Bookmark, Tag } from '~/types/types';
import TagButton from './TagButton.vue';

const props = defineProps({
   bookmark: {
      type: Object as PropType<Bookmark>,
      required: true,
   }
});

const hoverTag = ref(undefined) as Ref<Tag | undefined>;
const editingTag = ref(undefined) as Ref<Tag | undefined>;
const newTag = ref(undefined) as Ref<Tag | undefined>;
const availableTags = ref(useBookmark().getTags()) as Ref<Tag[]>;
const newTagInput = ref('') as Ref<string>;

function handleTagInput(event: Event) {
   newTagInput.value = (event.target as HTMLInputElement).value;

   // availableTags.value = useBookmark()
   //    .getTags()
   //    .filter(tag => !props.bookmark.tags.includes(tag))
   //    .filter(tag => tag.name !== newTag.value?.name)
   //    .filter(tag => tag.name.includes(newTagName));
}

function handleAddTagButtonClick() {
   // const tag = useBookmark().addTag(props.bookmark.id, 'test');
   newTag.value = {
      name: '',
      color: getRandomPastelColor(),
   } as Tag;

   nextTick(() => {
      document.getElementById('tag-input')?.focus();
   });
}

function handleTagInputAdd(tag: Tag, event: Event) {
   const updatedName = (event.target as HTMLInputElement).value;
   editingTag.value = undefined;

   if (updatedName === '') {
      console.log('empty name, deleting tag');

      // useBookmark().deleteTag(tag.name);
      // return;
   }

   if (useBookmark().existsTag(updatedName, props.bookmark)) {
      console.log('Could not update tag name, tag is already in use');
      document.querySelector('#tag-input')?.classList.add('border-red-500');
      setTimeout(() => {
         document.querySelector('#tag-input')?.classList.remove('border-red-500');
      }, 1000);
      return;
   }

   console.log('updated tag name', updatedName, tag);

   useBookmark().addTag(props.bookmark.id, updatedName, tag.color);
   newTag.value = undefined;
}

function handleTagSelectorClick(tag: Tag) {
   newTag.value = tag;

   nextTick(() => {
      document.getElementById('tag-input')?.focus();
   });
}

function handleEditingTag(tag: Tag) {
   editingTag.value = tag;
   console.log('handle editing tag', tag);
}

// onMounted(() => {
//    // On click outside .tag-selector set newTag to undefined but only if it's not already undefined
//    document.addEventListener('click', (event) => {
//       console.log(newTag.value + "asd");
      
//       if (editingTag.value !== undefined) {
//          const tagSelector = document.querySelector('.tag-selector');
//          if (tagSelector && !tagSelector.contains(event.target as Node)) {
//             newTag.value = undefined;
//          }
//       }
//    });
// });

</script>