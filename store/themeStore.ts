export const useTheme = defineStore('theme', {
   state: () => ({
      theme: 'dark'
   }),
   getters: {
      isDarkMode: (state) => state.theme === 'dark',
   },
   actions: {
      setTheme(theme: string) {
         if (theme === this.theme) return;
         this.theme = theme;
         useCookie('theme').value = `${theme}`;

         if (process.client) {
            document.body.classList.toggle('dark', theme === 'dark');
            document.body.classList.toggle('bg-gray-100', theme === 'light');
         }
      },
      toggleTheme() {
         this.setTheme(this.theme === 'light' ? 'dark' : 'light');
      }
   }
});