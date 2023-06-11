<template>
   <div class="w-full">
      <label
         class="mb-2 block"
      >
         {{ uppercase }}
      </label>
      <input
         class="w-full rounded py-2"
         type="text"
         name="title"
         :value="modelValue"
         @input="($event) => emit('update:modelValue', $event.target.value)"
      >
   </div>
</template>

<script setup>
const props = defineProps(['name', 'modelValue']);
const emit = defineEmits(['update:modelValue']);

const uppercase = computed(() => props.name.charAt(0).toUpperCase() + props.name.slice(1));
</script>