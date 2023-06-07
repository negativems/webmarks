<script lang="tsx" setup>
import { BuyMeACoffeIcon, FooterCurveIcon, Logo } from './Icons';
</script>

<template>
   <footer class="relative overflow-x-clip bg-white text-black dark:bg-black dark:text-gray-200">
      <div class="container relative z-10 mx-auto grid h-[200px] grid-cols-12 p-10">
         <div class="about col-span-4 hidden md:block">
            <h3 class="text-center">About</h3>
            <div class="text">
               <p class="mb-3">Hello 👋, I am Mohamed a 22yo programmer from <span class="location relative underline">Málaga</span>, Spain📍.</p>
               <p>This website is part of my final project of my degree, was made using
                  <a
                     href="https://nuxt.com"
                     class="font-bold text-accent-light underline"
                  >Nuxt</a>.
               </p>
            </div>
         </div>
         <div class="logo col-span-12 flex flex-col items-center gap-5 md:col-span-4">
            <h2 class="text-2xl font-extrabold">WEBMARKS</h2>
            <Logo class="h-[100px] w-[100px]" />
         </div>
         <div class="coffee col-span-4 hidden flex-col items-center gap-5 md:flex">
            <h3>Buy me a coffee</h3>
            <p>Please consider buy me a coffee if you think it deserves it.</p>

            <NuxtLink
               to="https://www.buymeacoffee.com/mohamedbh"
               class="inline"
               target="_blank"
               rel="noreferrer"
            >
               <BuyMeACoffeIcon class="h-[50px] w-[32px]" />
            </NuxtLink>
         </div>
      </div>
      <div class="h-[100px] w-full bg-accent-darker">
         <FooterCurveIcon class="hidden md:block"/>
      </div>
   </footer>
</template>