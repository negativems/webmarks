<script setup lang="ts">
import { Tag } from '~/types/types';

const { tag } = defineProps({
   tag: {
      type: Object as PropType<Tag>,
      required: true,
   },
});

</script>

<template>
   <span
      class="tag mx-1 rounded-full px-2 py-1 text-xs text-white"
      :style="{ 'color': getColorByBgColor(tag.color), 'background-color': tag.color}"
   >
      {{ tag.name }}
   </span>
</template>