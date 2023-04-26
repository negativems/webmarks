<template>
   <main className="bg-gray-100 flex-1 rounded-3xl p-10 m-5 h-min-[500px] overflow-auto">
      <slot />
   </main>
</template>

<style scoped>
::-webkit-scrollbar-track {
   margin: 20px 0px;
}
</style>