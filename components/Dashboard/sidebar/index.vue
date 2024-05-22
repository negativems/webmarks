<template>
   <div
      class="sidebar m-5 box-content hidden flex-col gap-10 rounded-2xl bg-white p-5 duration-200 ease-in-out dark:bg-neutral-800 md:flex"
      v-on:mouseenter="() => isSidebarHover = true"
      v-on:mouseleave="() => isSidebarHover = false"
      :class="{
         'w-64': isSidebarHover,
         'w-16': !isSidebarHover
      }"
   >
      <div class="logo flex justify-center">
         <NuxtLink
            to="/"
            class="mb-5 inline-block shadow-red-800 drop-shadow-solid-md duration-100 hover:scale-110 hover:drop-shadow-solid-xl"
         >
            <Logo class="drop-shadow-solid mx-auto h-24 w-full duration-200" />
         </NuxtLink>
      </div>

      <DashboardSidebarLinks
         :isSidebarHover="isSidebarHover"
         class="duration-200"
      />

      <DashboardSidebarFooter
         :isSidebarHover="isSidebarHover"
         class="duration-200"
      />
   </div>
</template>

<script lang="ts" setup>
import { Logo } from "@/components/Icons";
const isSidebarHover = ref(false);

onMounted(() => {
	isSidebarHover.value = !isMobile.value;
});

const isMobile = computed(() => screen.width < 768);
</script>