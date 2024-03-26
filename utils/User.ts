import type { UserProfile } from '~/types/types';

export const isLogged = () => {
  return useSupabaseUser().value !== null;
};

export async function isPro(userId: string | undefined, client: any = null): Promise<boolean> {
  if (!userId) return false;
  const supabase = (client ?? useSupabaseClient());

  return await supabase
    .from('profiles')
    .select("id, plan")
    .eq('id', userId)
    .then(({ data, error }: any) => {
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
}