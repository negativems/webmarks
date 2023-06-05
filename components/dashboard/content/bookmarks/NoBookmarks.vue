<template>
   <div
      class="no-bookmarks inline-flex flex-col items-center gap-5 rounded-2xl border-8 border-dashed p-10 text-center backdrop-blur-3xl"
      v-if="!hasBookmarks && bookmarkStore.bookmarksLoaded"
   >
      <p class="text-gray-500">
         You did not save any bookmark yet to read later
      </p>
      <button class="mt-5 flex items-center justify-center gap-5 rounded-lg bg-accent p-3 px-5 font-bold text-white hover:bg-neutral-900">
         <span>Create Bookmark</span>
      </button>
   </div>
</template>