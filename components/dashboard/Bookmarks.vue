<script setup lang="ts">
import { Bookmark, BookmarkDisplayFormat } from '~/types/types';
import { useBookmark } from '~/store/bookmark';
const bookmarkStore = useBookmark();

let prop = defineProps(['search', 'sort']);
const search = computed(() => prop.search as string);
const sort = computed(() => prop.sort as string);

const isRow = computed(() => bookmarkStore.bookmarkDisplayFormat === 'rows' as BookmarkDisplayFormat);

const bookmarks = computed(() => {
   let result = bookmarkStore.bookmarks;

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

   return result;
});

const allTags = computed(() => {
   return bookmarkStore.bookmarks.map(bookmark => bookmark.tags)
      .flat()
      .filter((tag, index, self) => index === self.findIndex(t => t.name === tag.name));
});

let hoverBookmarkId = ref(undefined as number | undefined);
const contextBookmarkId = ref(undefined as number | undefined);
const showContextMenu = (bookmarkId: number) => {
   contextBookmarkId.value = bookmarkId;
};

onMounted(() => {
   // Hide the context menu when left click outside of the context menu
   document.addEventListener('click', () => {
      const isOpenModal = document.querySelector('.modal') !== null;
      if (contextBookmarkId.value !== hoverBookmarkId.value && !isOpenModal) {
         contextBookmarkId.value = undefined;
      }
   });
});

function changeSelectedBookmark(id: number | undefined) {
   contextBookmarkId.value = id;
}
</script>

<template>
   <DashboardTagFilter v-if="!useRoute().path.includes('later')"/>
   <div
      class="bookmarks grid gap-5"
      :class="{
         'sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4': isRow,
      }"
   >
      <div
         class="bookmark flex"
         v-for="{ id: bookmarkId, title, url, tags } in    bookmarks   "
         :key="bookmarkId"
         @mouseenter="hoverBookmarkId = bookmarkId"
         @mouseleave="hoverBookmarkId = undefined"
         @contextmenu="$event.preventDefault(); showContextMenu(bookmarkId)"
      >
         <NuxtLink
            :to="url"
            target="_blank"
            class="relative box-content grid w-full grid-cols-12 justify-between gap-5 rounded-xl bg-white p-5 duration-200 hover:scale-[1.01] hover:bg-gray-200 hover:text-accent-dark hover:shadow-md dark:bg-gray-900 dark:hover:bg-black dark:hover:text-accent"
            :class="{
               'flex-col': isRow,
               'items-center': !isRow,
            }"
            @click=" bookmarkStore.addClickTo(bookmarkId) "
            @click.middle=" bookmarkStore.addClickTo(bookmarkId) "
         >
            <div class="col-span-11">
               <h3 class="text-xl font-bold">{{ title }}</h3>
               <p class="break-all text-gray-500">{{ url }}</p>
            </div>
            <div
               class="tags col-span-12"
               v-if=" tags?.length > 0 "
            >
               <span
                  class="tag mx-1 rounded-full px-2 py-1 text-xs font-bold text-white"
                  v-for="(    { name, color }, index    ) in     tags    "
                  :key=" index "
                  :style=" { 'background-color': color } "
               >
                  {{ name }}
               </span>
            </div>
         </NuxtLink>
      </div>

      <DashboardContextMenu
         v-if=" contextBookmarkId !== undefined "
         :bookmarkId=" hoverBookmarkId "
         @selectedBookmarkUpdated=" changeSelectedBookmark "
      />
   </div>
</template>