<template>
   <section>
      <h2 class="text-3xl font-bold mb-10">Plans</h2>
      <div class="flex gap-10">
         <HomePlanCard class="flex-1" name='Free' :features="freeFeatures" :price="0" />
         <HomePlanCard class="flex-1" name='Premium' :features="premiumFeatures" :price="19" :saveAmount="20" tryable dark />
         <HomePlanCard class="flex-1" name='Enterprise' :features="enterpriseFeatures" :price="19" :saveAmount="20" tryable />
      </div>
   </section>
</template>

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
