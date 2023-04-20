<template>
   <main className="bg-gray-100 flex-1 rounded-3xl p-10 m-5 h-min-[500px] overflow-auto">
      <slot />
   </main>
</template>

<style>
::-webkit-scrollbar {
   width: 10px;
}

::-webkit-scrollbar-track {
   border-radius: 10px;
   margin: 20px 0px;
}

::-webkit-scrollbar-thumb {
   background: var(--accent);
   border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
   background: var(--accent-dark);
}
</style>