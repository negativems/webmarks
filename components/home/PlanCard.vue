<template>
   <div :class="'plan-card p-10 shadow-md shadow-black rounded-3xl relative ' + (dark ? 'bg-accent-darker text-white' : 'bg-white') + ' ' + className">
      <header class="plan-card-header flex justify-between relative mb-10">
         <h3 class="text-center w-full">{{ name }}</h3>
         <span v-if="saveAmount" class="plan-card-save absolute top-1/2 -translate-y-1/2 right-0 px-3 py-1 rounded-md text-[10px]" :class="(dark ? 'bg-white text-black' : 'bg-red-400')">
            Saves {{ saveAmount }}%
         </span>
      </header>
      <div class="plan-card-body">
         <ul class="flex flex-col gap-4">
            <li v-for="(feature, index) in features" :key="index" class="flex flex-row gap-2 items-center">
               <CheckIcon />
               <span>{{ feature }}</span>
            </li>
         </ul>
      </div>
      <footer class="plan-card-footer">
         <div class="plan-card-price text-center font-extrabold text-2xl my-10">
            <span class="plan-card-price-currency">$</span>
            {{ price }}/month
         </div>
         <button v-if="tryable" class="bg-" @click="tryForFree">Try for free</button>
         <button v-else class="text-2xl" @click="getStarted">Get Started</button>
      </footer>
   </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CheckIcon, CrossIcon } from '~/components/Icons';

export default defineComponent({
   name: 'PlanCard',
   props: {
      name: {
         type: String,
         required: true
      },
      features: {
         type: Array,
         required: true
      },
      price: {
         type: Number,
         required: true
      },
      tryable: {
         type: Boolean,
         default: false
      },
      saveAmount: {
         type: Number,
         default: null
      },
      dark: {
         type: Boolean,
         default: false
      },
      className: {
         type: String,
         default: ''
      }
   },
   methods: {
      tryForFree() {
         // TODO: Implement try for free logic
      },
      getStarted() {
         // TODO: Implement get started logic
      }
   },
   components: {
      CheckIcon,
      CrossIcon
   }
});
</script>
