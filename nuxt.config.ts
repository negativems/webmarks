
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
   modules: [
      '@nuxtjs/tailwindcss',
      '@nuxtjs/supabase',
      '@pinia/nuxt',
   ],
   css: [
      '~/assets/style/global.scss',
      'vue-final-modal/style.css'
   ],
   vite: {
      server: {
         hmr: true
      }
   },
   tailwindcss: {
      viewer: false
   },
   pinia: {
      autoImports: [
         // automatically imports `defineStore`
         'defineStore', // import { defineStore } from 'pinia'
         ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
      ],
   },
   postcss: {
      plugins: {
         tailwindcss: {},
         autoprefixer: {},
      },
   },
});