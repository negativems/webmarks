<!-- This component is to make in the landing a demo of what the page look but only the visual structure, not the entire app obviously -->

<template>
  <div class="w-full h-full p-5 bg-red-300">
    <!-- Tags -->
    <ul class="flex justify-between">
      <li v-for="i in 6" :key="i" class="inline bg-black rounded-xl">
        <button class="px-3 text-sm">Tag {{ i }}</button>
      </li>
    </ul>

    <!-- Bookmarks content -->
    <div class="grid grid-cols-1 gap-5 mt-5 md:grid-cols-2 lg:grid-cols-6">
      <div v-for="i in 12" :key="i" class="bg-white rounded-xl">
        <div class="p-5">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">Bookmark {{ i }}</h3>
            <button class="px-3 py-1 text-sm text-white bg-black rounded-xl">Tag</button>
          </div>
          <p class="mt-2 text-sm text-gray-500">Description of the bookmark</p>
        </div>
      </div>
    </div>
  </div>
</template>