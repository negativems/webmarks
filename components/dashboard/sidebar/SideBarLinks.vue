<script setup>
import { GithubIcon, GoogleIcon } from '~/components/Icons';
const router = useRouter();
const client = useSupabaseClient();
const user = useSupabaseUser();

const pages = [
   { name: 'All bookmarks', link: '/dashboard' },
   { name: 'Most used', link: '/dashboard/most-used' },
   { name: 'Saved to later', link: '/dashboard/later' },
];
const selectedPage = Object.values(pages).find((page) => page.link === router.currentRoute.value.path)?.name.toLowerCase();

const { isSidebarToggled } = defineProps({
   toggled: Boolean,
});
</script>

<template>
   <div
      class="quick-links flex flex-col gap-5 justify-between h-full"
      :class="{ 'mt-5': isSidebarToggled }"
   >
      <NuxtLink
         class="p-5 hover:bg-accent flex gap-5 items-center justify-center rounded-lg"
         v-for="{ name, link, icon } in pages"
         :key="link"
         :to="link"
         :class="{
            'bg-accent font-semibold': selectedPage === name.toLowerCase(),
         }"
      >
         <GithubIcon />
         <span :class="{ 'hidden': !isSidebarToggled }">
            {{ name }}
         </span>
      </NuxtLink>

      <div class="buttons flex gap-5">
         <button
            class="login-button w-full inline-flex justify-center bg-black text-white font-bold p-5 rounded-lg hover:bg-gray-900 justify-self-end"
            @click="client.auth.signInWithOAuth({ provider: 'github' })"
            v-if="!user"
         >
            <GithubIcon class="invert" />
         </button>

         <button
            class="login-button w-full inline-flex justify-center bg-red-500 text-white font-bold p-5 rounded-lg hover:bg-gray-900 justify-self-end"
            @click="client.auth.signInWithOAuth({ provider: 'google' })"
            v-if="!user"
         >
            <GoogleIcon />
         </button>
      </div>

      <button
         class="login-button w-full bg-red-400 text-white font-bold p-5 rounded-lg flex justify-center gap-5 hover:bg-gray-900 justify-self-end"
         @click="client.auth.signOut()"
         v-if="user"
      >
         <button
            class=""
            :class="{ 'hidden': !isSidebarToggled }"
         >
            Logout
         </button>
      </button>
   </div>
</template>