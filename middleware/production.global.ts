export default defineNuxtRouteMiddleware((to) => {
   const isProduction = process.env.NODE_ENV === 'development' ?? true;
   if (isProduction && to.path !== '/maintenance') {
      return navigateTo('/maintenance');
   }
});
