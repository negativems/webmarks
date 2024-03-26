<template>
  <DashboardContentFilterTagFilter
    v-if="!useRoute().path.includes('later') && useBookmark().hasBookmarks"
    :toggleTag="toggleTag"
  />
  <div
    class="bookmarks relative grid gap-5"
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
      class="bookmark relative flex flex-col gap-y-2 truncate rounded-xl border border-gray-600 bg-white p-5 duration-200 hover:scale-[1.01] hover:bg-neutral-200 hover:text-accent-dark hover:shadow-md dark:border-neutral-600 dark:bg-black dark:hover:bg-black dark:hover:text-accent dark:text-white"
      :class="{ 'flex-row': isRow, 'favourite': is_favourite }"
      @click="bookmarkStore.addClickTo(bookmarkId)"
      @click.middle="bookmarkStore.addClickTo(bookmarkId)"
    >
      <StarIcon
        v-if="is_favourite"
        title="This bookmark is a favourite"
        color="#fcec03"
        fill="#fcec03"
        class="star-icon absolute left-1 top-1 z-10 scale-75"
      />
      <div class="flex flex-col truncate">
        <div class="flex flex-col">
          <div class="flex justify-between">
            <h3 class="text-xl font-bold">
              <img
                :src="favicon || '/favicon.ico'"
                :alt="'Favicon of ' + url"
                class="inline"
                width="16"
              >
              {{ title }}
            </h3>
          </div>
          <span class="relative">
            {{ url }}
          </span>
        </div>
        <div
          v-if="tags?.length > 0"
          class="flex flex-wrap gap-2"
          :class="{ 'mt-4': !isRow }"
        >
          <DashboardContentBookmarksTag
            v-for="(tag, index) in tags"
            :key="index"
            :tag="tag"
          />
        </div>

        <div
          class=""
          v-if="bookmarkStore.exists({ url })"
        >
          <InfoIcon title="There is a bookmark with the same url" />
        </div>
      </div>
    </NuxtLink>

    <DashboardContentBookmarksContextMenu
      v-if="contextBookmarkId !== undefined"
      :bookmarkId="contextBookmarkId"
      @selectedBookmarkUpdated="changeSelectedBookmark"
    />
  </div>
</template>

<script
  setup
  lang="ts"
>
import { type Bookmark, type BookmarkDisplayFormat } from '~/types/types';
import { useBookmark } from '~/store/bookmark';
import { InfoIcon, StarIcon } from '~/components/Icons';
const bookmarkStore = useBookmark();

let prop = defineProps(['search', 'sort']);

const search = computed(() => prop.search as string);
const sort = computed(() => prop.sort as string);

const isRow = computed(() => bookmarkStore.bookmarkDisplayFormat === 'rows' as BookmarkDisplayFormat);

// Used to tell the context menu which bookmark to use in the buttons (edit favourite and delete)
const contextBookmarkId = ref(undefined as number | undefined);
let hoverBookmarkId = ref(undefined as number | undefined);

function toggleTag(name: string) {
  let selectedTags = bookmarkStore.selectedTags;
  if (selectedTags.includes(name)) {
    selectedTags = selectedTags.filter((tag: any) => tag !== name);
  } else {
    selectedTags.push(name);
  }
}

const bookmarks = computed(() => {
  let result = bookmarkStore.bookmarks;
  let selectedTags = bookmarkStore.selectedTags;

  if (selectedTags.length > 0) {
    if (useBookmark().bookmarkFilterTagType === 'restrictive') {
      // Filter all bookmarks must have all the selected tags
      console.log("restrictive", "selectedTags", selectedTags, "result", result);

      result = result.filter(bookmark => selectedTags.every(tag => bookmark.tags?.some(bookmarkTag => bookmarkTag.name === tag)));
    } else {
      // At least one of the selected tags must be in the bookmark
      result = result.filter(bookmark => bookmark.tags?.some(tag => selectedTags.includes(tag.name)));
    }
  }

  // Filter by search
  if (search.value) {
    const titleIncludes = (bookmark: Bookmark) => bookmark.title.toLowerCase().includes(search.value.toLowerCase());
    const urlIncludes = (bookmark: Bookmark) => bookmark.url.toLowerCase().includes(search.value.toLowerCase());
    result = result.filter((bookmark: any) => titleIncludes(bookmark) || urlIncludes(bookmark));
  }

  // Sort
  if (sort.value === 'redirects') {
    result = result.sort((a, b) => b.redirects - a.redirects);
  } else if (sort.value === 'title') {
    result = result.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort.value === 'url') {
    result = result.sort((a, b) => a.url.localeCompare(b.url));
  }


  for (const bookmark of result) {
    bookmark.favicon = getFavicon(bookmark.url);
  }

  return result;
});

function handleBookmarkRightClick(bookmarkId: number) {
  contextBookmarkId.value = bookmarkId;
};

function changeSelectedBookmark(id: number | undefined) {
  contextBookmarkId.value = id;
}

onMounted(() => {
  // Close context menu when clicking
  document.addEventListener('click', () => {
    const isOpenModal = document.querySelector('.modal') !== null;
    if (!isOpenModal) {
      contextBookmarkId.value = undefined;
    }
  });
});

</script>