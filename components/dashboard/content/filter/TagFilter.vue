<template>
   <div class="w-full rounded-lg bg-white dark:bg-black">
      <div class="flex flex-col gap-2 p-4">
         <div class="flex flex-wrap gap-2">
            <DashboardContentBookmarksTag
               v-for="tag in useBookmark().getTags()"
               :tag="tag"
               :key="tag.name"
               :isButton="true"
               :handleClick="(tag) => toggleTag(tag.name)"
               :isSelected="selectedTags.includes(tag.name)"
            />
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { useBookmark } from '~/store/bookmark';
defineProps(['toggleTag', 'selectedTags']);
</script>