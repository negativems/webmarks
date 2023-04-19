<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const pages = {
   allBookmarks: { name: 'All bookmarks', link: '/dashboard' },
   mostUsed: { name: 'Most used', link: '/dashboard/most-used' },
   savedToLater: { name: 'Saved to later', link: '/dashboard/later' },
};

const selectedPage = Object.values(pages).find(
   (page) => page.link === router.currentRoute.value.path
)?.name.toLowerCase();
</script>

<template>
   <div class="sidebar w-1/6 px-5 box-content">
      <Logo class="mx-auto w-10" />

      <div class="quick-links flex flex-col mt-10 gap-5">
         <NuxtLink :to="pages.allBookmarks.link" class="p-5 hover:bg-accent flex gap-5 items-center rounded-lg" :class="{ 'bg-accent': selectedPage === 'all bookmarks', 'font-semibold': selectedPage === 'all bookmarks' }">
            <ListBulletIcon class="w-5" />
            <span>{{ pages.allBookmarks.name.toUpperCase() }}</span>
         </NuxtLink>
         <NuxtLink :to="pages.mostUsed.link" class="p-5 hover:bg-accent flex gap-5 items-center rounded-lg" :class="{ 'bg-accent': selectedPage === 'most used', 'font-semibold': selectedPage === 'most used' }">
            <Clock class="w-5" />
            <span>{{ pages.mostUsed.name.toUpperCase() }}</span>
         </NuxtLink>
         <NuxtLink :to="pages.savedToLater.link" class="p-5 hover:bg-accent flex gap-5 items-center rounded-lg" :class="{ 'bg-accent': selectedPage === 'saved to later', 'font-semibold': selectedPage === 'saved to later' }">
            <NumberedSquare :number="3" class="w-5" />
            <span>{{ pages.savedToLater.name.toUpperCase() }}</span>
         </NuxtLink>
      </div>
   </div>
</template>
