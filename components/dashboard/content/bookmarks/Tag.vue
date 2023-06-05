<script setup lang="ts">
import { Tag } from '~/types/types';

const { tag } = defineProps({
   tag: {
      type: Object as PropType<Tag>,
      required: true,
   },
   isButton: {
      type: Boolean,
      default: false,
   },
   isSelected: {
      type: Boolean,
      default: false,
   },
   handleClick: {
      type: Function as PropType<(tag: Tag) => void>,
      required: false,
   },
});
</script>

<template>
   <button
      v-if="isButton"
      class="btn btn-primary relative rounded-lg px-2 text-black"
      :style="{ backgroundColor: tag.color, color: getColorByBgColor(tag.color) }"
      @click="handleClick !== undefined && handleClick(tag)"
   >
      {{ tag.name }}
      <div
         v-if="isSelected"
         class="selected-tag-mark before absolute -bottom-2 left-1/2 mx-auto box-content block h-1 w-1/2 -translate-x-1/2 transform rounded-full border border-neutral-600"
         :style="{ backgroundColor: tag.color}"
      ></div>
   </button>
   <span
      v-else
      class="tag mx-1 rounded-full px-2 py-1 text-xs text-white"
      :style="{ 'color': getColorByBgColor(tag.color), 'background-color': tag.color }"
   >
      {{ tag.name }}
</span></template>