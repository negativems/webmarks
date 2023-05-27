<script setup lang="ts">
const client = useSupabaseClient();
const user = useSupabaseUser();
</script>

<template>
   <!-- Login template using tailwind -->
   <div class="flex h-screen flex-col items-center justify-center">
      <div class="flex flex-col items-center justify-center rounded-lg bg-white p-10 shadow-lg">
         <h1 class="mb-5 text-3xl font-bold">Login</h1>
         <form class="flex flex-col items-center justify-center gap-5">
            <input
               type="text"
               class="w-80 rounded-lg border-2 border-gray-300 p-2 focus:border-indigo-500 focus:outline-none"
               placeholder="Username"
            />
            <input
               type="password"
               class="w-80 rounded-lg border-2 border-gray-300 p-2 focus:border-indigo-500 focus:outline-none"
               placeholder="Password"
            />

            <div class="buttons flex gap-5">
               <button
                  class="login-button inline-flex w-full justify-center justify-self-end rounded-lg bg-black p-5 font-bold text-white hover:bg-gray-900"
                  @click="client.auth.signInWithOAuth({ provider: 'github' })"
               >
                  <GithubIcon class="invert" />
               </button>

               <button
                  class="login-button inline-flex w-full justify-center justify-self-end rounded-lg bg-red-500 p-5 font-bold text-white hover:bg-gray-900"
                  @click="client.auth.signInWithOAuth({ provider: 'google' })"
               >
                  <GoogleIcon />
               </button>
            </div>

            <button class="flex justify-center gap-5 rounded-lg bg-indigo-500 p-2 font-bold text-white hover:bg-gray-900">
            Login
         </button>
      </form>
   </div>
</div></template>