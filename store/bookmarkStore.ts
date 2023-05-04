import { Bookmark, BookmarkDisplayFormat } from "~/types/types";

export const bookmarkStore = {
   bookmarks: [] as Bookmark[],
   bookmarksLoaded: false,
   bookmarkDisplayFormat: 'columns' as BookmarkDisplayFormat,
   loadBookmarkDisplayFormat() {
      if (process.client && localStorage.getItem('bookmarkDisplayFormat') !== null) {
         this.bookmarkDisplayFormat = localStorage.getItem('bookmarkDisplayFormat') as BookmarkDisplayFormat;
      }
   },
   toggleBookmarkDisplayFormat() {
      this.bookmarkDisplayFormat = this.bookmarkDisplayFormat === 'columns' ? 'cards' : 'columns';

      if (process.client) {
         localStorage.setItem('bookmarkDisplayFormat', this.bookmarkDisplayFormat);
      }
   },
   incrementRedirects(id: number | undefined) {
      if (id === undefined) return;

      if (process.client) {
         const user = useSupabaseUser().value;
         const client = useSupabaseClient();

         if (user === null) {
            const bookmark = this.bookmarks.find(bookmark => bookmark.id === id);
            if (bookmark !== undefined) {
               bookmark.redirects++;
               localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
            }

            return;
         }

         const redirects = this.bookmarks.find(bookmark => bookmark.id === id)?.redirects || 0;
         client.from('bookmarks').upsert({ id, redirects } as any).then(() => {
            console.log('Bookmark redirects incremented');
         });
      }
   },
   async loadBookmarks(): Promise<void> {
      this.bookmarksLoaded = false;
      if (process.client) {
         const user = useSupabaseUser().value;
         const client = useSupabaseClient();

         if (user === null) {
            this.bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
            this.bookmarksLoaded = true;
            return;
         }

         const { data } = await client.from('bookmarks').select('id, title, description, url, redirects').eq('user_id', user.id).limit(100);
         this.bookmarks = (data || []) as Bookmark[];
         this.bookmarksLoaded = true;
         return;
      }

      this.bookmarks = [];
   },
   async addBookmark(data: Bookmark | Bookmark[]) {
      if (this.bookmarks === undefined) return;

      if (process.client) {
         const user = useSupabaseUser().value;
         const client = useSupabaseClient();

         if (user === null) {
            if (Array.isArray(data)) {
               data.forEach(bookmark => {
                  bookmark.id = this.bookmarks.length + 1;
                  bookmark.redirects = 0;
               });

               localStorage.setItem('bookmarks', JSON.stringify([...this.bookmarks, ...data]));
               this.bookmarks.push(...data);
               return;
            }

            data.id = this.bookmarks.length + 1;
            data.redirects = 0;
            localStorage.setItem('bookmarks', JSON.stringify([...this.bookmarks, data]));
            this.bookmarks.push(data);
            return;
         }

         if (Array.isArray(data)) {
            data.forEach(bookmark => bookmark.user_id = user.id);
         } else {
            data.user_id = user.id;
         }

         client.from('bookmarks').insert(data as any).then(() => {
            this.bookmarks?.push(Array.isArray(data) ? [...data] as any : data);
         });
      }
   },
   async deleteBookmark(id: number | undefined) {
      if (id === undefined) return;

      if (process.client) {
         const user = useSupabaseUser().value;
         const client = useSupabaseClient();

         if (user === null) {
            const newBookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
            localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
            this.bookmarks = newBookmarks;
            return;
         }

         client.from('bookmarks').delete().eq('id', id).then(() => {
            this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
            console.log('Bookmark deleted');
         });
      }
   }
};