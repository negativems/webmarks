<script lang="ts" setup>
import { GithubIcon, GoogleIcon, Logo, LogoutIcon, SettingsIcon } from '@/components/Icons';
const router = useRouter();

const isSidebarHover = ref(true);
const isSettingsOpen = ref(false);

const client = useSupabaseClient();
const user = useSupabaseUser();

function signOut() {
   client.auth.signOut().then(() => {
      router.push('/');
   });
}
</script>

<template>
   <div
      class="sidebar m-5 box-content flex-col gap-10 rounded-2xl bg-white p-5 duration-200 ease-in-out dark:bg-neutral-800 max-[500px]:hidden md:flex"
      v-on:mouseenter="() => isSidebarHover = true"
      v-on:mouseleave="() => isSidebarHover = false"
      :class="{
         'w-64': isSidebarHover,
         'w-16': !isSidebarHover
      }"
   >
      <div class="logo flex justify-center">
         <NuxtLink
            to="/"
            class="mb-5 inline-block shadow-red-800 drop-shadow-solid-md duration-100 hover:scale-110 hover:drop-shadow-solid-xl"
         >
            <Logo class="drop-shadow-solid mx-auto h-24 w-full duration-200" />
         </NuxtLink>
      </div>

      <DashboardSidebarLinks
         :isSidebarHover="isSidebarHover"
         class="duration-200"
      />

      <footer
         class="footer-buttons grid gap-2"
         :class="{
               'grid-cols-3': !user && isSidebarHover,
               'grid-cols-2': user && isSidebarHover
            }"
      >
         <div class="settings relative inline-flex">
            <button
               class="settings-button flex w-full items-center justify-center rounded-lg bg-neutral-600 p-5 font-bold text-white duration-100 hover:bg-neutral-800 dark:hover:bg-neutral-700"
               @click="isSettingsOpen = !isSettingsOpen"
            >
               <SettingsIcon />
            </button>
            <div
               class="absolute -top-[200px] h-[200px] w-[150px] bg-red-300"
               v-if="isSettingsOpen"
            >
               asd
            </div>
         </div>

         <button
            class="login-button inline-flex items-center justify-center rounded-lg bg-black p-5 font-bold text-white duration-100 hover:scale-110 hover:bg-neutral-800 dark:hover:bg-neutral-700"
            @click="client.auth.signInWithOAuth({ provider: 'github' })"
            v-if="!user && isSidebarHover"
         >
            <GithubIcon class="invert" />
         </button>

         <button
            class="login-button inline-flex items-center justify-center rounded-lg bg-red-500 p-5 font-bold text-white duration-100 hover:scale-110 hover:bg-red-600"
            @click="client.auth.signInWithOAuth({ provider: 'google' })"
            v-if="!user && isSidebarHover"
         >
            <GoogleIcon />
         </button>

         <button
            class="logout-button w-full rounded-lg bg-red-500 p-5 font-bold text-white hover:bg-red-600"
            @click="signOut()"
            v-if="user && isSidebarHover"
         >
            <LogoutIcon :class="{ 'hidden': isSidebarHover }" />
            <span
               class="delay-200"
               :class="{ 'hidden': !isSidebarHover }"
            >
               Logout
            </span>
         </button>
      </footer>
   </div></template>
