<template>
   <div class="hero flex h-[700px] bg-white bg-contain bg-right-bottom bg-no-repeat pb-[50px] dark:bg-black md:py-[50px]">
      <div class="container relative mx-auto flex flex-col px-10">
         <div class="hero-background-form absolute left-[100px] top-[155px] h-20 w-[220px] rounded-full bg-accent-light opacity-60 blur-[50px]"></div>
         <div class="mt-10 flex h-full flex-col gap-32 md:flex-row">
            <div class="flex flex-col justify-center gap-5">
               <Logo class="mx-auto h-14 md:hidden" />
               <h1 class="text-center font-sans text-2xl drop-shadow-solid-md dark:text-white md:text-left md:text-5xl">
                  <span class="block md:text-5xl">MANAGE YOUR</span>
                  <span class="block text-accent-dark dark:text-accent md:text-5xl">BOOKMARKS</span>
                  <span class="block md:text-5xl">IN THE SIMPLEST WAY</span>
               </h1>
            </div>
            <div class="flex flex-1 items-center justify-center md:justify-end">
               <img
                  src="/dashboard.png"
                  alt="Dashboard"
                  class="scale-125 rounded-xl drop-shadow-xl"
               >
            </div>
         </div>
         <div class="buttons flex justify-center lg:justify-start">
            <NuxtLink
               to="/dashboard"
               class="inline-block rounded-lg bg-accent-dark px-12 py-3 font-bold text-white shadow-solid-md ring-accent-dark duration-100 hover:scale-110 hover:bg-accent hover:shadow-solid-xl focus:bg-accent-light focus:ring active:bg-accent-dark"
            >
               Try it
            </NuxtLink>
         </div>
      </div>
   </div>
</template>

<script setup>
import { Logo } from '../Icons';

</script>