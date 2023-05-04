<script lang="ts">
// List of all the features that are included in the free plan of the bookmarks website app
const freeFeatures = [
   'Unlimited bookmarks',
   'Unlimited collections',
   'Tagging system',
   'Search functionality',
   'Import/export bookmarks',
   'Duplicate bookmark detection',
   'Dark mode',
   'Basic themes (pre-defined, non-customizable)'
];

const premiumFeatures = [
   'Unlimited highlights',
   'Nested collections',
   'Bookmark thumbnails',
   'Broken link detection',
   'Bookmark annotations',
   'Automatic categorization',
   'Reading progress tracking',
   'Bookmark recommendations',
   'URL shortening',
   'Offline access',
   'Sync across devices',
   'Save bookmarks to read later',
   'Mobile app support',
   'Priority support'
];

const enterpriseFeatures = [
   'All Premium features',
   'Custom branding',
   'Custom themes',
   'Single sign-on (SSO)',
   'User management',
   'Group management',
   'Activity logs',
   'Dedicated account manager',
   '24/7 support'
];

export default {
   data() {
      return {
         freeFeatures,
         premiumFeatures,
         enterpriseFeatures
      };
   }
};
</script>

<template>
   <main>
      <section class="py-20">
         <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="text-center">
               <h2 class="text-base font-semibold uppercase tracking-wide">Features</h2>
               <p class="mt-1 text-4xl font-extrabold text-gray-800 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">The right price for you, whoever you are</p>
               <p class="mx-auto mt-5 max-w-xl text-xl text-gray-600 dark:text-gray-400">Whether you're a student, a developer, a designer or a business owner, we've got the perfect plan for you.</p>
            </div>
         </div>

         
      </section>
   </main>
</template>