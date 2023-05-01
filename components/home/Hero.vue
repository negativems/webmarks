<template>
   <div class="hero flex h-[700px] bg-white bg-contain bg-right-bottom bg-no-repeat pt-[60px] dark:bg-gray-900">
      <div class="container relative mx-auto flex">
         <div class="hero-background-form absolute left-[100px] top-[155px] h-20 w-[220px] rounded-full bg-accent-light blur-[30px]"></div>
         <div class="left flex flex-1 flex-col justify-center gap-40">
            <h1 class="font-sans text-5xl font-extrabold drop-shadow-solid-md dark:text-white">
               The simplest way to manage your bookmarks
            </h1>
            <div class="buttons">
               <NuxtLink
                  to="/dashboard"
                  class="inline-block rounded-lg bg-accent px-6 py-3 font-bold shadow-solid-md ring-accent-dark duration-150 hover:scale-110 hover:shadow-solid-xl focus:bg-accent-light focus:ring active:bg-accent-dark"
               >
                  Try it
               </NuxtLink>
            </div>
         </div>
         <div class="right flex flex-1 items-center justify-end">
            <div class="square h-2/3 w-80 rounded-2xl bg-gray-300 p-5 shadow-solid-xl">
               asd
            </div>
         </div>
      </div>
   </div>
</template>