<template>
   <section class="hero flex h-[700px] bg-white bg-contain bg-right-bottom bg-no-repeat pb-[50px] dark:bg-black md:py-[50px]">
      <div class="container relative flex flex-col px-10">
         <div class="hero-background-form absolute left-[100px] top-[155px] h-20 w-[220px] rounded-full bg-accent-light opacity-60 blur-[50px]"></div>
         <div class="flex flex-col h-full gap-10 mt-10 md:flex-row">
            <div class="flex flex-col justify-center gap-5">
               <Logo class="mx-auto h-14 md:hidden" />
               <h1 class="font-sans text-2xl text-center drop-shadow-solid-md dark:text-white md:text-left md:text-5xl">
                  <span class="block md:text-5xl">MANAGE YOUR</span>
                  <span class="block text-accent-dark dark:text-accent md:text-5xl">BOOKMARKS</span>
                  <span class="block md:text-5xl">IN THE SIMPLEST WAY</span>
               </h1>
                <p class="inline leading-relaxed">The definitive web to centralize and manage all the bookmarks you have in the different browsers you use. No more need to export and import!</p>
            </div>
            <div class="flex items-center justify-center w-3/5 md:justify-end">
               <!-- <img
                  src="/dashboard.png"
                  alt="Dashboard"
                  class="w-full rounded-xl drop-shadow-xl"
               /> -->
               <DemoPlayground />
            </div>
         </div>
         <div class="flex justify-center buttons lg:justify-start">
            <NuxtLink to="/dashboard" class="inline-block px-12 py-3 font-bold text-white duration-100 rounded-lg bg-accent-dark shadow-solid-md ring-accent-dark hover:scale-110 hover:bg-accent hover:shadow-solid-xl focus:bg-accent-light focus:ring active:bg-accent-dark dark:text-white">Try it</NuxtLink>
         </div>
      </div>
   </section>
</template>

<script setup>
import { Logo } from "../Icons";
import DemoPlayground from './DemoPlayground.vue';
</script>