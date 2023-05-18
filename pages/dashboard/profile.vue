<script setup lang="ts">
import { User } from '@supabase/supabase-js';
definePageMeta({
   middleware: 'authentication',
   layout: 'dashboard'
});

const supabaseUser = useSupabaseUser();

let user = ref(undefined) as any;

onMounted(() => {
   const { id, user_metadata, email, phone } = supabaseUser.value as User;
   const { avatar_url, full_name } = user_metadata;

   user = {
      id,
      email,
      phone,
      avatar_url,
      full_name
   };
});

</script>

<template>
   <div class="py-8" v-if="user">
      <h1 class="text-3xl font-bold">Profile</h1>

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
      </div>
   </div>
</template>