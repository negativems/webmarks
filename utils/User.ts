export const isLogged = () => {
   return useSupabaseUser().value !== null;
};