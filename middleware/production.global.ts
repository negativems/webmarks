export default defineNuxtRouteMiddleware((to) => {
   const isProduction = process.env.NODE_ENV === 'production' ?? true;
   if (isProduction && to.path !== '/maintenance') {
      return navigateTo('/maintenance');
   }
});
