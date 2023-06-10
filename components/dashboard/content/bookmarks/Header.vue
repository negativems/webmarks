<template>
   <header>
      <DashboardContentHeaderSearchBar
         :search="search"
         @update:search="$emit('update:search', $event)"
         v-if="hasBookmarks"
      />
      <DashboardContentHeaderDisplayFormatSwitcher
         :format="displayFormat"
         v-if="hasBookmarks"
         class="hidden md:block"
      />
   </header>
</template>

<script setup>
defineProps(['search', 'hasBookmarks', 'displayFormat']);
</script>