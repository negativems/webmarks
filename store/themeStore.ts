import { defineStore } from "pinia";

export const useTheme = defineStore("theme", {
	state: () => ({
		theme: useCookie("theme").value || "dark",
	}),
	getters: {
		isDarkMode: (state) => state.theme === "dark",
	},
	actions: {
		setTheme(theme: string) {
			if (theme === this.theme) {
				console.log("Theme not changed");
				return;
			}

			console.log("Theme changed to", theme);

			this.theme = theme;
			useCookie("theme").value = `${theme}`;

			if (process.client) {
				document.body.classList.toggle("dark", theme === "dark");
				document.body.classList.toggle("bg-neutral-100", theme === "light");
			}
		},
		toggleTheme() {
			this.setTheme(this.theme === "light" ? "dark" : "light");
		},
	},
});
