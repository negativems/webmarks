<template>
   <button
      class="relative inline-flex rounded-lg text-black"
      :key="tag.name"
      @mouseenter="!isEditing && emit('hoverTag', tag)"
      @mouseleave="!isEditing && emit('hoverTag', undefined)"
   >
      <span
         class="rounded-lg px-5"
         :style="{ backgroundColor: tag.color, color: getColorByBgColor(tag.color) }"
         v-if="!isEditing"
      >
         {{ tag.name }}
      </span>
      <div
         class="hover-buttons flex"
         v-if="isHover && !isEditing"
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
         v-if="isEditing"
      >
         <input
            class="rounded-md"
            id="tag-input"
            type="text"
            :value="tag.name"
            @change="handleTagInputChange(tag, $event)"
            @blur="emit('editingTag', undefined)"
            :class="{
                  'bg-red-300': existsTag,
               }"
         />
      </div>
   </button>
</template>

<script setup lang="ts">
import { TrashIcon } from "~/components/Icons";
import { PencilIcon } from "~/components/Icons";
import { useBookmark } from "~/store/bookmark";
import type { Bookmark, Tag } from "~/types/types";

const props = defineProps({
	bookmark: {
		type: Object as PropType<Bookmark>,
		required: true,
	},
	tag: {
		type: Object as PropType<Tag>,
		required: true,
	},
	isHover: {
		type: Boolean as PropType<boolean>,
		required: true,
	},
	isEditing: {
		type: Boolean as PropType<boolean>,
		required: true,
	},
});

const emit = defineEmits(["editingTag", "hoverTag"]);
const existsTag = computed(() => useBookmark().existsTag(props.tag.name));

function handleDeleteTagClick(tag: Tag) {
	useBookmark().deleteTag(tag.name, props.bookmark.id);

	if (useBookmark().selectedTags.includes(tag.name)) {
		useBookmark().unselectTag(tag.name);
	}
}

function handleEditTagColorClick(tag: Tag, event: Event) {
	const newColor = (event.target as HTMLInputElement).value;
	useBookmark().updateTag(props.bookmark.id, tag.name, tag.name, newColor);
}

function handlePencilClick(tag: Tag) {
	emit("editingTag", tag);

	nextTick(() => {
		document.getElementById("tag-input")?.focus();
	});
}

function handleTagInputChange(tag: Tag, event: Event) {
	const newTagName = (event.target as HTMLInputElement).value;

	if (newTagName === tag.name) {
		emit("editingTag", undefined);
		return;
	}

	if (
		useBookmark()
			.getTags()
			.some((tag) => tag.name === newTagName)
	) {
		return;
	}

	useBookmark().updateTag(props.bookmark.id, tag.name, newTagName, tag.color);
	emit("editingTag", undefined);
}
</script>