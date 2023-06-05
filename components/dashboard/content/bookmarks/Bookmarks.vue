<template>
   <DashboardContentFilterTagFilter
      v-if="!useRoute().path.includes('later') && useBookmark().hasBookmarks"
      :toggleTag="toggleTag"
      :selectedTags="selectedTags"
   />
   <div
      class="bookmarks grid gap-5"
      :class="{
            'sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4': !isRow,
         }"
   >
      <div
         v-if="!useBookmark().bookmarksLoaded"
         class="absolute left-1/2 top-1/2 h-auto text-center"
      >
         Loading...
      </div>

      <NuxtLink
         :to="url"
         target="_blank"
         :title="title"
         :bookmark-id="bookmarkId"
         v-for="{ id: bookmarkId, title, url, tags, favicon, is_favourite } in bookmarks"
         :key="bookmarkId"
         @contextmenu.prevent="handleBookmarkRightClick(bookmarkId)"
         class="bookmark flex flex-col justify-between rounded-xl bg-white p-5 duration-200 hover:scale-[1.01] hover:bg-neutral-200 hover:text-accent-dark hover:shadow-md dark:bg-neutral-900 dark:hover:bg-black dark:hover:text-accent"
         :class="{
               'flex-row': isRow,
            }"
         @click="bookmarkStore.addClickTo(bookmarkId)"
         @click.middle="bookmarkStore.addClickTo(bookmarkId)"
      >
         <div class="flex flex-col"> 
            <div class="relative flex justify-between">
               <h3 class="overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold">
                  <StarIcon
                     v-if="is_favourite"
                     title="This bookmark is a favourite"
                     color="#fcec03"
                     fill="#fcec03"
                     class="absolute -left-7 -top-7 scale-110"
                  />
                  <img
                     :src="favicon"
                     class="inline"
                     :alt="'Favicon of ' + url"
                     width="16"
                  >
                  {{ title }}
               </h3>
            </div>
            <p class="break-all text-gray-500">{{ url.substring(0, 50) + (url.length > 50 ? '...' : '') }}</p>
         </div>
         <div v-if="tags?.length > 0">
            <DashboardContentBookmarksTag
               v-for="(tag, index) in tags"
               :key="index"
               :tag="tag"
            />
         </div>
      </NuxtLink>

      <DashboardContentBookmarksContextMenu
         v-if="contextBookmarkId !== undefined"
         :bookmarkId="contextBookmarkId"
         @selectedBookmarkUpdated="changeSelectedBookmark"
      />
   </div>
</template>

<script setup lang="ts">
import { Bookmark, BookmarkDisplayFormat } from '~/types/types';
import { useBookmark } from '~/store/bookmark';
import { StarIcon } from '~/components/Icons';
const bookmarkStore = useBookmark();

let prop = defineProps(['search', 'sort']);

const search = computed(() => prop.search as string);
const sort = computed(() => prop.sort as string);

const isRow = computed(() => bookmarkStore.bookmarkDisplayFormat === 'rows' as BookmarkDisplayFormat);

const selectedTags = ref([] as string[]);

// Used to tell the context menu which bookmark to use in the buttons (edit favourite and delete)
const contextBookmarkId = ref(undefined as number | undefined);

let hoverBookmarkId = ref(undefined as number | undefined);

function toggleTag(name: string) {
   if (selectedTags.value.includes(name)) {
      selectedTags.value = selectedTags.value.filter((tag: any) => tag !== name);
   } else {
      selectedTags.value.push(name);
   }
}

const bookmarks = computed(() => {
   let result = bookmarkStore.bookmarks;

   if (selectedTags.value.length > 0) {
      result = result.filter(bookmark => bookmark.tags.some(tag => selectedTags.value.includes(tag.name)));
   }

   if (search.value) {
      const titleIncludes = (bookmark: Bookmark) => bookmark.title.toLowerCase().includes(search.value.toLowerCase());
      const urlIncludes = (bookmark: Bookmark) => bookmark.url.toLowerCase().includes(search.value.toLowerCase());
      result = result.filter((bookmark: any) => titleIncludes(bookmark) || urlIncludes(bookmark));
   }

   if (sort.value === 'redirects') {
      result = result.sort((a, b) => b.redirects - a.redirects);
   } else if (sort.value === 'title') {
      result = result.sort((a, b) => a.title.localeCompare(b.title));
   } else if (sort.value === 'url') {
      result = result.sort((a, b) => a.url.localeCompare(b.url));
   }

   // Set icon
   result = result.map((bookmark: Bookmark) => {
      bookmark.favicon = getFavicon(bookmark.url);
      return bookmark;
   });

   return result;
});

function handleBookmarkRightClick(bookmarkId: number) {
   contextBookmarkId.value = bookmarkId;
};

function changeSelectedBookmark(id: number | undefined) {
   contextBookmarkId.value = id;
}

onMounted(() => {
   // Hide the context menu when left click outside of the context menu
   document.addEventListener('click', () => {
      const isOpenModal = document.querySelector('.modal') !== null;
      if (contextBookmarkId.value !== hoverBookmarkId.value && !isOpenModal) {
         contextBookmarkId.value = undefined;
      }
   });
});
</script>