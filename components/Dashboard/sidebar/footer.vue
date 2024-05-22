<template>
  <footer
    class="grid gap-2 footer-buttons"
    :class="{
      'grid-cols-3': !isLogged && isSidebarHover,
      'grid-cols-2': isLogged === true && isSidebarHover
    }"
  >
    <div class="relative inline-flex settings">
      <button
        class="flex items-center justify-center w-full p-5 font-bold text-white duration-100 rounded-lg settings-button bg-neutral-400 hover:scale-110 hover:bg-neutral-500 dark:bg-neutral-700 dark:hover:bg-black"
        @click="handleSettingsClick()"
      >
        <SettingsIcon />
      </button>
    </div>

    <button
      class="inline-flex items-center justify-center p-5 font-bold text-white duration-100 bg-black rounded-lg login-button hover:scale-110 hover:bg-neutral-800 dark:hover:bg-neutral-700"
      @click="client.auth.signInWithOAuth({ provider: 'github' })"
      v-if="!isLogged && isSidebarHover"
    >
      <GithubIcon class="invert" />
    </button>

    <button
      class="inline-flex items-center justify-center p-5 font-bold text-white duration-100 bg-red-500 rounded-lg login-button hover:scale-110 hover:bg-red-600"
      @click="client.auth.signInWithOAuth({ provider: 'google' })"
      v-if="!isLogged && isSidebarHover"
    >
      <GoogleIcon />
    </button>

    <button
      class="w-full p-5 font-bold text-white bg-red-500 rounded-lg logout-button hover:bg-red-600"
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
import {
	GithubIcon,
	GoogleIcon,
	LogoutIcon,
	SettingsIcon,
} from "@/components/Icons";
import SettingsModal from "@/components/Modals/SettingsModal/index.vue";
const router = useRouter();
const client = useSupabaseClient();

defineProps({
	isSidebarHover: {
		type: Boolean,
		required: true,
	},
});

const user = useSupabaseUser();
const isLogged = computed(() => user.value !== null);

// const { open, close } = useModal({
//   component: SettingsModal,
//   attrs: {
//     title: 'Settings',
//     onClosed() {
//       console.log('closed');
//     }
//   } as any,
// });

function handleSettingsClick() {
	// open();
}

function signOut() {
	client.auth.signOut().then(() => {
		router.push("/");
	});
}

onMounted(() => {
	// On click on .modal-background, close the modal
	document.addEventListener("click", (e) => {
		const target = e.target as HTMLElement | null;
		if (target?.classList.contains("modal-background")) {
			close();
		}
	});
});
</script>