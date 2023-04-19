<template>
   <div class="dashboard bg-accent-light flex min-h-[300px] h-[100vh] max-h-[100vh]">
      <DashboardSideBar />
      <DashboardContent>
         <slot />
      </DashboardContent>
   </div>
</template>