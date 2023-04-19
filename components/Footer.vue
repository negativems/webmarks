<script lang="tsx" setup>
import { BuyMeACoffeIcon } from './Icons';
</script>

<template>
   <footer class="bg-accent-light relative overflow-x-clip">
      <div class="container mx-auto grid grid-cols-12 p-10 relative z-10 h-[200px]">
         <div class="about col-span-4">
            <h3 class="text-center">About</h3>
            <div class="text">
               <p class="mb-3">Hello 👋, I am Mohamed a 22yo programmer from <span class="underline location relative">Málaga</span>, Spain📍.</p>
               <p>This website is part of my final project of my degree, was made using the ReactJS framework
                  <Link href="https://nextjs.org" class="font-bold underline">NextJS</Link>.
               </p>
            </div>
         </div>
         <div class="logo flex flex-col gap-5 items-center col-span-4">
            <h2 class="text-2xl font-extrabold">WEBMARKS</h2>
            <Logo />
         </div>
         <div class="coffee col-span-4 flex flex-col items-center gap-5">
            <h3>Buy me a coffee</h3>
            <p>Please consider buy me a coffee if you think it deserves it.</p>

            <NuxtLink to="https://www.buymeacoffeee.com/mohamedbh" class="font-bold" target="_blank" rel="noreferrer">
               <BuyMeACoffeIcon />
            </NuxtLink>
         </div>
      </div>
      <div class="bg-accent-darker w-full h-[100px]">
         <svg class="mx-auto" width="1920" height="100" fill="none">
            <path fill="#9DFF7A" d="M0 0h1920v100H0z" />
            <path fill="#77FF47" d="M968.5 59.088C588.405 59.51 0 0 0 0v100h1920V.5s-578.2 58.173-951.5 58.588Z" />
            <path fill="#255116" d="M1920 100V.5s-582.1 76.65-960 76.65S0 0 0 0v100h1920Z" />
         </svg>
      </div>
   </footer>
</template>