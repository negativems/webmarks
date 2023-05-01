import { bookmarkStore } from "./bookmarkStore";
import { themeStore } from "./themeStore";

export const store = reactive({
   ...bookmarkStore,
   ...themeStore
});