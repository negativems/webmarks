<template>
   <VueFinalModal @update:model-value="(val: any) => emit('update:modelValue', val)">
      <div class="absolute top-0 left-0 w-full h-full modal-background backdrop-blur"></div>
      <div class="absolute flex flex-col w-1/2 gap-10 p-10 transform -translate-x-1/2 -translate-y-1/2 rounded-lg modal left-1/2 top-1/2 bg-neutral-100 dark:bg-neutral-600">
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

         <div class="flex justify-between buttons">
            <button
               class="px-5 py-3 duration-200 rounded-md bg-accent-dark drop-shadow-solid-md hover:scale-105 hover:drop-shadow-solid-xl"
               @click="handleSaveClick()"
            >
               Save
            </button>

            <button
               v-if="isPro"
               class="px-5 py-3 duration-200 bg-purple-500 rounded-md drop-shadow-solid-md hover:scale-105 hover:drop-shadow-solid-xl focus:bg-purple-600 disabled:cursor-not-allowed"
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
// import { VueFinalModal } from "vue-final-modal";
import { useBookmark } from "~/store/bookmark";
import { useUser } from "~/store/user";
import type { Bookmark } from "~/types/types";

const props = defineProps({
	bookmark: {
		type: Object as PropType<Bookmark>,
		required: true,
	},
});

const isPro = computed(() => useUser().isPro);

const emit = defineEmits(["update:modelValue"]);

const generatingAI = ref(false);

function saveBookmark() {
	useBookmark().edit(props.bookmark);
}

function handleSaveClick() {
	saveBookmark();
	emit("update:modelValue", false);
}

function handleGenerateTagsClick() {
	// Generate tags using the endpoint /api/ai?url={url}
	// it returns an array of 5 strings
	const url = props.bookmark.url;
	const endpoint = `/api/ai?url=${url}`;

	generatingAI.value = true;
	fetch(endpoint)
		.then((res) => res.json())
		.then((data) => {
			const tags = data;
      for (const tag of tags) {
        if (!tag || tag.length === 0) continue;

        useBookmark().addTag(
          props.bookmark.id,
          tag.toLowerCase(),
          getRandomPastelColor(),
        );
      }

			generatingAI.value = false;
		});
}
</script>