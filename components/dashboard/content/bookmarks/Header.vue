<template>
   <header class="flex justify-between">
      <div class="flex gap-2">
         <SearchBar
            :search="search"
            @update:search="$emit('update:search', $event)"
            v-if="hasBookmarks"
         />
         <DisplayFormatSwitcher
            :format="displayFormat"
            v-if="hasBookmarks"
            class="hidden md:block"
         />
         <DisplayFilterTagsTypeSwitcher
            :format="displayFormat"
            v-if="hasBookmarks"
            class="hidden md:block"
         />
      </div>
      <button
         class="rounded-md bg-accent-light px-5 duration-100 hover:scale-105 hover:bg-accent hover:drop-shadow-solid-xl dark:bg-accent-dark"
         @click="$emit('addBookmark')"
      >
         Add bookmark
      </button>
   </header>
</template>

<script setup>
import DisplayFilterTagsTypeSwitcher from '../header/DisplayFilterTagsTypeSwitcher.vue';
import DisplayFormatSwitcher from '../header/DisplayFormatSwitcher.vue';
import SearchBar from '../header/SearchBar.vue';

defineProps(['search', 'hasBookmarks', 'displayFormat', 'filterTagsType']);
</script>