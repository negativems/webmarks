<template>
   <VueFinalModal @update:model-value="(val: any) => emit('update:modelValue', val)">
      <div class="absolute top-0 left-0 w-full h-full modal-background backdrop-blur"></div>
      <div class="absolute flex flex-col w-1/2 gap-10 p-10 transform -translate-x-1/2 -translate-y-1/2 rounded-lg modal left-1/2 top-1/2 bg-neutral-100 dark:bg-neutral-600">
         <span class="text-2xl">Settings</span>
         <div class="form">
            <!-- Dark mode -->
            <div class="flex items-center gap-5">
               <span>Dark mode</span>
               <ColorSchemeToggle />
            </div>
         </div>
      </div>
   </VueFinalModal>
</template>

<script setup lang="ts">
// import { VueFinalModal } from "vue-final-modal";
const emit = defineEmits(["update:modelValue"]);
</script>