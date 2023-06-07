<template>
   <div class="hero flex h-[700px] bg-white bg-contain bg-right-bottom bg-no-repeat py-[100px] dark:bg-black">
      <div class="container relative mx-auto flex flex-col px-10">
         <div class="hero-background-form absolute left-[100px] top-[155px] h-20 w-[220px] rounded-full bg-accent-light opacity-60 blur-[50px]"></div>
         <div class="flex h-full flex-col md:flex-row">
            <div class="flex flex-col justify-center gap-5">
               <h1 class="font-sans text-4xl drop-shadow-solid-md dark:text-white md:text-5xl">
                  <span class="block text-4xl">MANAGE YOUR</span>
                  <span class="block text-4xl text-accent-dark dark:text-accent-light">BOOKMARKS</span>
                  <span class="block text-3xl">in the simplest way</span>
               </h1>
            </div>
            <div class="flex flex-1 items-center justify-end">
               <div class="square h-2/3 w-80 rounded-2xl bg-neutral-300 p-5 shadow-solid-xl">
                  asd
               </div>
            </div>
         </div>
         <div class="buttons">
            <NuxtLink
               to="/dashboard"
               class="inline-block rounded-lg border-2 border-accent px-6 py-3 font-bold shadow-solid-md ring-accent-dark duration-100 hover:scale-110 hover:bg-accent hover:shadow-solid-xl focus:bg-accent-light focus:ring active:bg-accent-dark dark:bg-neutral-900"
            >
               Try it
            </NuxtLink>
         </div>
      </div>
   </div>
</template>