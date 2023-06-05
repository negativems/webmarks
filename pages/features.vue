<script setup lang="ts">
// List of all the features that are included in the free plan of the bookmarks website app
const starterFeatures = [
   'Unlimited Bookmarks',
   'Unlimited Collections',
   'Tagging System',
   'Search Functionality',
   'Import/Export Bookmarks',
];

const proFeatures = [
   'Limitless Text Highlighting',
   'Comprehensive Nested Collections',
   'Visual Bookmark Thumbnails',
   'Smart Broken Link Identification',
   'Interactive Bookmark Annotations',
   'Automated Bookmark Categorization',
   'Reading Progress Tracker',
   'Personalized Bookmark Recommendations',
   'Convenient URL Shortening',
   'Offline Bookmark Accessibility',
   'Cross-device Synchronization',
   'Save-for-later Bookmark Option',
   'Mobile Application Support',
   'Priority Customer Assistance'
];

const premiumFeatures = [
   'Access to All Premium Features',
   'Customizable Branding Options',
   'Unique Custom Themes',
   'Convenient Single Sign-on (SSO)',
   'Effective User Management System',
   'Efficient Group Management Tools',
   'Comprehensive Activity Logs',
   'Dedicated Account Management',
   'Round-the-clock Support'
];

</script>

<template>
   <main class="container relative mx-auto">
      <div class="py-20">
         <section class="title-section mx-auto">
            <div class="text-center">
               <h2 class="text-base font-semibold uppercase tracking-wide">Features</h2>
               <p class="mt-1 text-4xl font-extrabold text-gray-800 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">Choose the Perfect Plan</p>
               <p class="mx-auto mt-5 max-w-xl text-xl text-gray-600 dark:text-gray-400">Whether you're a student, a developer, a designer, or a business owner, we have a plan tailored to your needs.</p>
            </div>
         </section>

         <section class="plans-section mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div class="rounded-lg bg-white p-6 shadow dark:bg-neutral-700">
               <h3 class="mb-4 text-center text-3xl font-medium text-gray-900 dark:text-white">Free Plan</h3>
               <ul class="text-gray-600 dark:text-gray-400">
                  <li
                     v-for="feature in starterFeatures"
                     :key="feature"
                  >
                     <svg
                        class="inline-flex h-5 w-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                     >
                        <path
                           fill-rule="evenodd"
                           d="M9.707 14.293a1 1 0 0 0 1.414 0l5-5a1 1 0 1 0-1.414-1.414L10 11.586l-3.293-3.293a1 1 0 0 0-1.414 1.414l4 4z"
                           clip-rule="evenodd"
                        ></path>
                     </svg>
                     {{ feature }}
                  </li>
               </ul>
               <div class="mt-6">
                  <p class="text-xl font-bold text-gray-900 dark:text-white">$0/month</p>
                  <button class="mt-4 rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600">
                     Get Started
                  </button>
               </div>
            </div>

            <div class="rounded-lg bg-white p-6 shadow dark:bg-neutral-700">
               <h3 class="mb-4 text-center text-3xl font-medium text-gray-900 dark:text-white">Premium Plan</h3>
               <ul class="text-gray-600 dark:text-gray-400">
                  <li
                     v-for="feature in premiumFeatures"
                     :key="feature"
                  >
                     <svg
                        class="inline-flex h-5 w-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                     >
                        <path
                           fill-rule="evenodd"
                           d="M9.707 14.293a1 1 0 0 0 1.414 0l5-5a1 1 0 1 0-1.414-1.414L10 11.586l-3.293-3.293a1 1 0 0 0-1.414 1.414l4 4z"
                           clip-rule="evenodd"
                        ></path>
                     </svg>
                     {{ feature }}
                  </li>
               </ul>
               <div class="mt-6">
                  <p class="text-xl font-bold text-gray-900 dark:text-white">$9.99/month</p>
                  <button class="mt-4 rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600">
                     Get Started
                  </button>
               </div>
            </div>

            <div class="rounded-lg bg-white p-6 shadow dark:bg-neutral-700">
               <h3 class="mb-4 text-center text-3xl font-medium text-gray-900 dark:text-white">Enterprise Plan</h3>
               <ul class="text-gray-600 dark:text-gray-400">
                  <li
                     v-for="feature in proFeatures"
                     :key="feature"
                  >
                     <svg
                        class="inline-flex h-5 w-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                     >
                        <path
                           fill-rule="evenodd"
                           d="M9.707 14.293a1 1 0 0 0 1.414 0l5-5a1 1 0 1 0-1.414-1.414L10 11.586l-3.293-3.293a1 1 0 0 0-1.414 1.414l4 4z"
                           clip-rule="evenodd"
                        ></path>
                     </svg>
                     {{ feature }}
                  </li>
               </ul>
               <div class="mt-6">
                  <p class="text-xl font-bold text-gray-900 dark:text-white">Contact us for pricing</p>
                  <button class="mt-4 rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600">
                     Contact Sales
                  </button>
               </div>
            </div>
         </section>

         <div class="background absolute bottom-0 left-[50%] -z-10 h-1/3 w-screen -translate-x-1/2 transform bg-neutral-300 dark:bg-neutral-400"></div>
      </div>
   </main>
</template>