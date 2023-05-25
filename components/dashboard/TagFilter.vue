<script setup lang="ts">
import { useBookmark } from '~/store/bookmark';

const allTags = computed(() => {
   return useBookmark().tags;
});

const selectedTags = ref([] as string[]);

const toggleTag = (name: string) => {
   if (selectedTags.value.includes(name)) {
      selectedTags.value = selectedTags.value.filter(tag => tag !== name);
   } else {
      selectedTags.value.push(name);
   }
};
</script>

<template>
   <div class="w-full rounded-lg bg-gray-900">
      <div class="flex flex-col gap-2 p-4">
         <div class="flex flex-wrap gap-2">
            <button
               v-for="{ name, color } in allTags"
               :key="name"
               class="btn btn-primary rounded-lg px-2 text-black"
               :style="{ backgroundColor: color }"
               @click="toggleTag(name)"
            >
               {{ name }}
            </button>
         </div>
      </div>
   </div>
</template>