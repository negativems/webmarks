<template>
   <VueFinalModal @update:model-value="val => emit('update:modelValue', val)">
      <div class="modal-background absolute left-0 top-0 h-full w-full backdrop-blur"></div>
      <div class="modal absolute left-1/2 top-1/2 flex w-1/2 -translate-x-1/2 -translate-y-1/2 transform flex-col gap-10 rounded-lg bg-neutral-100 p-10 dark:bg-neutral-600">
         asd
      </div>
   </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';
const emit = defineEmits(['update:modelValue']);
</script>