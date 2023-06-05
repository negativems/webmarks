<template>
   <label
      class="mb-2 block"
      :for="name"
   >
      {{ uppercase }}
   </label>
   <input
      class="w-1/2 rounded py-2"
      type="text"
      name="title"
      v-model="modelValue"
   >
</template>

<script setup>
const props = defineProps(['name', 'modelValue']);
const uppercase = computed(() => props.name.charAt(0).toUpperCase() + props.name.slice(1));
</script>