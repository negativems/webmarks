<script setup lang="ts">
<<<<<<< Updated upstream
import { User } from '@supabase/supabase-js';
definePageMeta({
   middleware: 'authentication',
   layout: 'dashboard'
=======
import type { User } from "@supabase/supabase-js";
definePageMeta({
	middleware: "authentication",
	layout: "dashboard",
>>>>>>> Stashed changes
});

const supabaseUser = useSupabaseUser();

let user = ref(undefined) as any;

onMounted(() => {
<<<<<<< Updated upstream
   const { id, user_metadata, email, phone } = supabaseUser.value as User;
   const { avatar_url, full_name } = user_metadata;

   user = {
      id,
      email,
      phone,
      avatar_url,
      full_name
   };
=======
	const { id, user_metadata, email, phone } = supabaseUser.value as User;
	const { avatar_url, full_name } = user_metadata;

	user = {
		id,
		email,
		phone,
		avatar_url,
		full_name,
	};
>>>>>>> Stashed changes
});
</script>

<template>
   <div class="py-8" v-if="user">
      <h1 class="text-3xl font-bold">Profile</h1>

<<<<<<< Updated upstream
      <div class="mt-8 flex items-center">
         <div class="mr-4">
            <img
               :src="user.avatar_url"
               alt="avatar"
               class="w-16 rounded-full"
            />
         </div>
         <div>
            <h2 class="text-xl font-semibold">{{ user.full_name }}</h2>
            <p class="text-gray-500">{{ user.email }}</p>
            <p class="text-gray-500">{{ user.phone }}</p>
         </div>
=======
    <div class="flex items-center mt-8">
      <div class="mr-4">
        <img
          :src="user.avatar_url"
          alt="avatar"
          class="w-16 rounded-full"
        />
>>>>>>> Stashed changes
      </div>
   </div>
</template>