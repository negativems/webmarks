<script setup lang="ts">

onMounted(() => {
   setTimeout(() => {
      document.querySelector('.context-menu')?.classList.add('h-[200px]');
   }, 100);
});

</script>

<template>
   <div class="context-menu absolute -bottom-[200px] right-0 z-10 h-0 w-[150px] rounded-lg bg-white delay-200 duration-200">
   </div>
</template>