import { fileURLToPath } from "node:url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
<<<<<<< Updated upstream
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
=======
  modules: [
    "@nuxtjs/supabase",
    "@pinia/nuxt",
    "@nuxt/ui",
    "@nuxt/image",
  ],
  plugins: [
    {
      src: "~/plugins/vercel.ts",
      mode: "client",
    },
  ],
  alias: {
    "@": fileURLToPath(new URL("./", import.meta.url)),
  },
  css: ["~/assets/style/global.scss"],
  vite: {
    server: { hmr: true },
  },
  tailwindcss: {
    viewer: false,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
>>>>>>> Stashed changes
});