import { defineStore } from 'pinia';
import { UserProfile } from '~/types/types';

export const useUser = defineStore('user', {
   actions: {
      isLoggedIn: () => useSupabaseUser().value?.id !== undefined,
      isPro: async () => {
         const user = useSupabaseUser().value;
         if (!user) return false;
         const supabase = useSupabaseClient();

         await supabase
            .from('profiles')
            .select("id, plan")
            .eq('id', user.id)
            .then(({ data, error }) => {
               if (error) {
                  console.log("There was an error getting your user profile");
                  return false;
               }

               if (!data || data.length === 0) return false;

               const profile = data[0] as UserProfile;
               if (!profile) return false;

               if (profile.plan === 'pro') return true;

               return false;
            });

         return false;
      }
   }
});