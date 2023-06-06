<template>
   <footer
      class="footer-buttons grid gap-2"
      :class="{
         'grid-cols-3': !isLogged && isSidebarHover,
         'grid-cols-2': isLogged && isSidebarHover
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
         v-if="!isLogged && isSidebarHover"
      >
         <GithubIcon class="invert" />
      </button>

      <button
         class="login-button inline-flex items-center justify-center rounded-lg bg-red-500 p-5 font-bold text-white duration-100 hover:scale-110 hover:bg-red-600"
         @click="client.auth.signInWithOAuth({ provider: 'google' })"
         v-if="!isLogged && isSidebarHover"
      >
         <GoogleIcon />
      </button>

      <button
         class="logout-button w-full rounded-lg bg-red-500 p-5 font-bold text-white hover:bg-red-600"
         @click="signOut()"
         v-if="isLogged && isSidebarHover"
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
</template>

<script setup lang="ts">
import { GithubIcon, GoogleIcon, LogoutIcon, SettingsIcon } from '@/components/Icons';
const router = useRouter();
const client = useSupabaseClient();

defineProps({
   isSidebarHover: {
      type: Boolean,
      required: true
   }
});
const isSettingsOpen = ref(false);

const user = useSupabaseUser();
const isLogged = computed(() => user.value !== null);

function signOut() {
   client.auth.signOut().then(() => {
      router.push('/');
   });
}
</script>