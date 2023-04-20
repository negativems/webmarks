<script setup lang="ts">
import { GithubIcon, GoogleIcon } from '~/components/Icons';

const client = useSupabaseClient();
const user = useSupabaseUser();
</script>

<template>
   <!-- Login template using tailwind -->
   <div class="flex flex-col items-center justify-center h-screen">
      <div class="flex flex-col items-center justify-center bg-white p-10 rounded-lg shadow-lg">
         <h1 class="text-3xl font-bold mb-5">Login</h1>
         <form class="flex flex-col items-center justify-center gap-5">
            <input type="text" class="border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-indigo-500 w-80" placeholder="Username" />
            <input type="password" class="border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-indigo-500 w-80" placeholder="Password" />

            <div class="buttons flex gap-5">
               <button
                  class="login-button w-full inline-flex justify-center bg-black text-white font-bold p-5 rounded-lg hover:bg-gray-900 justify-self-end"
                  @click="client.auth.signInWithOAuth({ provider: 'github' })"
               >
                  <GithubIcon class="invert" />
               </button>

               <button
                  class="login-button w-full inline-flex justify-center bg-red-500 text-white font-bold p-5 rounded-lg hover:bg-gray-900 justify-self-end"
                  @click="client.auth.signInWithOAuth({ provider: 'google' })"
               >
                  <GoogleIcon />
               </button>
            </div>

            <button class="bg-indigo-500 text-white font-bold p-2 rounded-lg flex justify-center gap-5 hover:bg-gray-900">
               Login
            </button>
         </form>
      </div>
   </div>

</template>