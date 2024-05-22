<template>
   <div class="w-full rounded-lg bg-white dark:bg-black">
      <div class="flex flex-col gap-2 p-4">
         <div class="flex flex-wrap gap-3">
            <DashboardContentBookmarksTag
               v-for="tag in useBookmark().getTags()"
               :tag="tag"
               :key="tag.name"
               :isButton="true"
               :handleClick="(tag) => useBookmark().toggleTag(tag.name)"
               :isSelected="useBookmark().selectedTags.includes(tag.name)"
               class="hover:shadow-md"
            />

            <span v-if="useBookmark().getTags().length === 0">You can add a tag by right clicking and editing a bookmark</span>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { useBookmark } from "~/store/bookmark";
</script>