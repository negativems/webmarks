<script setup>
import { BookmarkIcon, ClockIcon, StarIcon } from '~/components/Icons';
import { useTheme } from '~/store/themeStore';

const { isDarkMode } = useTheme();
const router = useRouter();

const pages = [
   { name: 'All bookmarks', link: '/dashboard', icon: BookmarkIcon },
   { name: 'Favourites', link: '/dashboard/favourites', icon: StarIcon },
   { name: 'Saved to later', link: '/dashboard/later', icon: ClockIcon },
];
const isSelectedPage = (link) => link === router.currentRoute.value.path;

const { isSidebarHover } = defineProps(['isSidebarHover']);

const iconColor = computed(() => isDarkMode ? 'white' : 'black');
</script>

<template>
   <div class="quick-links flex h-full flex-col gap-5">
      <NuxtLink
         class="flex items-center justify-center gap-5 overflow-hidden rounded-lg p-5 duration-150 hover:scale-110 hover:bg-accent dark:hover:bg-accent-dark"
         v-for="{ name, link, icon } in pages"
         :key="link"
         :to="link"
         :class="{
               'bg-accent font-semibold dark:bg-accent-dark': isSelectedPage(link),
               'shadow-solid-md': isSidebarHover,
            }"
      >
         <component
            :is="icon({color: iconColor})"
            :class="{ 'hidden': isSidebarHover }"
         />
         <span :class="{ 'hidden': !isSidebarHover }" class="whitespace-nowrap">
            {{ name }}
         </span>
      </NuxtLink>
   </div>
</template>