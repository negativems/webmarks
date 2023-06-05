<script setup lang="ts">
import { useBookmark } from '~/store/bookmark';

const allTags = computed(() => {
   return useBookmark().tags;
});

defineProps(['toggleTag', 'selectedTags']);
</script>

<template>
   <div class="w-full rounded-lg bg-white dark:bg-neutral-900">
      <div class="flex flex-col gap-2 p-4">
         <div class="flex flex-wrap gap-2">
            <button
               v-for="{ name, color } in allTags"
               :key="name"
               class="btn btn-primary rounded-lg border-2 px-2 text-black"
               :class="{
                  'border-accent': selectedTags.includes(name),
                  'border-transparent': !selectedTags.includes(name),
               }"
               :style="{ backgroundColor: color, color: getColorByBgColor(color) }"
               @click="toggleTag(name)"
            >
               {{ name }}
            </button>
         </div>
      </div>
   </div>
</template>