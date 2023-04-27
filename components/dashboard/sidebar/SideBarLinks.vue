<script setup>
import { BookmarkIcon, Clock, StarIcon } from '~/components/Icons';
const router = useRouter();

const pages = [
   { name: 'All bookmarks', link: '/dashboard', icon: BookmarkIcon },
   { name: 'Most used', link: '/dashboard/most-used', icon: StarIcon },
   { name: 'Saved to later', link: '/dashboard/later', icon: Clock },
];
const isSelectedPage = (link) => link === router.currentRoute.value.path;

const { isSidebarHover } = defineProps({
   isSidebarHover: Boolean,
});
</script>

<template>
   <div class="quick-links flex flex-col gap-5 h-full">
      <NuxtLink
         class="p-5 hover:bg-accent flex gap-5 items-center justify-center rounded-lg hover:scale-110 duration-200"
         v-for="{ name, link, icon } in pages"
         :key="link"
         :to="link"
         :class="{
            'bg-accent font-semibold': isSelectedPage(link),
            'shadow-solid-md': isSidebarHover,
         }"
      >
         <component
            :is="icon"
            :class="{ 'hidden': isSidebarHover }"
         />
         <span :class="{ 'hidden': !isSidebarHover }">
            {{ name }}
         </span>
      </NuxtLink>
   </div>
</template>