<script lang="ts" setup>
import { GithubIcon, GoogleIcon, Logo, LogoutIcon } from '../Icons';
import SideBarLinks from './sidebar/SideBarLinks.vue';
const router = useRouter();

const isSidebarHover = ref(true);

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
      class="sidebar p-5 box-content flex flex-col bg-white m-5 rounded-2xl duration-100 ease-in-out gap-10"
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
            class="inline-block mb-5 hover:scale-110 duration-150 drop-shadow-solid-md hover:drop-shadow-solid-xl shadow-red-800"
         >
            <Logo class="mx-auto h-24 duration-200 drop-shadow-solid" />
         </NuxtLink>
      </div>

      <SideBarLinks
         :isSidebarHover="isSidebarHover"
         class="duration-200"
      />

      <div class="account-buttons">
         <div
            class="not-logged flex gap-5 justify-center"
            v-if="!user && isSidebarHover"
         >
            <button
               class="login-button w-24 inline-flex justify-center items-center bg-black text-white font-bold p-5 rounded-lg hover:bg-gray-800 justify-self-end hover:scale-110 duration-150"
               @click="client.auth.signInWithOAuth({ provider: 'github' })"
            >
               <GithubIcon class="invert" />
            </button>

            <button
               class="login-button w-24 inline-flex justify-center items-center bg-red-500 text-white font-bold p-5 rounded-lg hover:bg-red-600 justify-self-end hover:scale-110 duration-150"
               @click="client.auth.signInWithOAuth({ provider: 'google' })"
            >
               <GoogleIcon />
            </button>

         </div>

         <button
            class="login-button w-full bg-red-400 text-white font-bold p-5 rounded-lg hover:bg-gray-900 justify-self-end"
            @click="signOut()"
            v-if="user"
         >
            <LogoutIcon :class="{ 'hidden': isSidebarHover }" />
            <span
               class="delay-200"
               :class="{ 'hidden': !isSidebarHover }"
            >
               Logout
            </span>
         </button>
      </div>
   </div></template>
