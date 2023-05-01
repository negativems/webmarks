
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
   modules: [
      '@nuxtjs/tailwindcss',
      '@nuxtjs/supabase',
   ],
   css: [
      '~/assets/style/global.scss'
   ],
   vite: {
      server: {
         hmr: true
      }
   },
   tailwindcss: {
      viewer: false
   },
   postcss: {
      plugins: {
         tailwindcss: {},
         autoprefixer: {},
      },
   },
});