<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { Clock, GithubIcon, GoogleIcon, ListBulletIcon, NumberedSquare } from '../Icons';

const router = useRouter();

const pages = {
   allBookmarks: { name: 'All bookmarks', link: '/dashboard' },
   mostUsed: { name: 'Most used', link: '/dashboard/most-used' },
   savedToLater: { name: 'Saved to later', link: '/dashboard/later' },
};

const selectedPage = Object.values(pages).find(
   (page) => page.link === router.currentRoute.value.path
)?.name.toLowerCase();

const client = useSupabaseClient();
const user = useSupabaseUser();
</script>

<template>
   <div class="sidebar w-1/6 px-5 box-content flex flex-col">
      <div class="logo flex justify-center">
         <NuxtLink to="/" class="inline-block px-5 hover:scale-110 duration-150 drop-shadow-2xl hover:drop-shadow-2xl shadow-red-800">
            <Logo class="mx-auto w-10" />
         </NuxtLink>
      </div>

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

         <div class="buttons flex gap-5">
            <button class="login-button w-full inline-flex justify-center bg-black text-white font-bold p-5 rounded-lg hover:bg-gray-900 justify-self-end" @click="client.auth.signInWithOAuth({ provider: 'github' })" v-if="!user">
               <GithubIcon class="invert" />
            </button>

            <button class="login-button w-full inline-flex justify-center bg-red-500 text-white font-bold p-5 rounded-lg hover:bg-gray-900 justify-self-end" @click="client.auth.signInWithOAuth({ provider: 'google' })" v-if="!user">
               <GoogleIcon />
            </button>
         </div>

         <button class="login-button w-full bg-red-400 text-white font-bold p-5 rounded-lg flex justify-center gap-5 hover:bg-gray-900 justify-self-end" @click="client.auth.signOut()" v-if="user">
            <button class="">Logout</button>
         </button>
      </div>

   </div>
</template>
