<script lang="ts" setup>
import { GithubIcon, GoogleIcon, Logo, LogoutIcon } from '@/components/Icons';
import SideBarLinks from './SideBarLinks.vue';
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
      class="sidebar m-5 box-content flex-col gap-10 rounded-2xl bg-white p-5 duration-200 ease-in-out dark:bg-gray-800 max-[500px]:hidden md:flex"
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

      <SideBarLinks
         :isSidebarHover="isSidebarHover"
         class="duration-200"
      />

      <div class="account-buttons">
         <div
            class="not-logged flex justify-center gap-5"
            v-if="!user && isSidebarHover"
         >
            <button
               class="login-button inline-flex w-24 items-center justify-center justify-self-end rounded-lg bg-black p-5 font-bold text-white duration-100 hover:scale-110 hover:bg-gray-800 dark:hover:bg-gray-700"
               @click="client.auth.signInWithOAuth({ provider: 'github' })"
            >
               <GithubIcon class="invert" />
            </button>

            <button
               class="login-button inline-flex w-24 items-center justify-center justify-self-end rounded-lg bg-red-500 p-5 font-bold text-white duration-100 hover:scale-110 hover:bg-red-600"
               @click="client.auth.signInWithOAuth({ provider: 'google' })"
            >
               <GoogleIcon />
            </button>

         </div>

         <button
            class="login-button w-full justify-self-end rounded-lg bg-red-400 p-5 font-bold text-white hover:bg-gray-900"
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
   </div>
</template>
