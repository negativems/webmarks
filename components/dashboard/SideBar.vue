<script lang="ts" setup>
import { Logo } from '../Icons';
import SideBarLinks from './sidebar/SideBarLinks.vue';

const isSidebarToggled = ref(false);
</script>

<template>
   <div
      class="sidebar w-1/6 p-5 box-content flex flex-col bg-white m-5 rounded-2xl"
      :class="{ 'w-auto': !isSidebarToggled }"
      v-on:mouseenter="() => isSidebarToggled = true"
      v-on:mouseleave="() => isSidebarToggled = false"
   >
      <div
         class="logo flex justify-center"
         :class="{ 'hidden': !isSidebarToggled }"
      >
         <NuxtLink
            to="/"
            class="inline-block px-5 hover:scale-110 duration-150 drop-shadow-2xl hover:drop-shadow-2xl shadow-red-800"
         >
            <Logo class="mx-auto h-24" />
         </NuxtLink>
      </div>

      <SideBarLinks :isSidebarToggled="isSidebarToggled"/>
   </div>
</template>
