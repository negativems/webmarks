import { Bookmark, BookmarkDisplayFormat, Tag } from "~/types/types";
import short, { SUUID } from 'short-uuid';

export const bookmarkStore = {
   bookmarks: [] as Bookmark[],
   bookmarksLoaded: false,
   bookmarkDisplayFormat: 'cards' as BookmarkDisplayFormat,
   loadBookmarkDisplayFormat() {
      if (process.client && localStorage.getItem('bookmarkDisplayFormat') !== null) {
         this.bookmarkDisplayFormat = localStorage.getItem('bookmarkDisplayFormat') as BookmarkDisplayFormat;
      }
   },
   toggleBookmarkDisplayFormat() {
      this.bookmarkDisplayFormat = this.bookmarkDisplayFormat === 'rows' ? 'cards' : 'rows';

      if (process.client) {
         localStorage.setItem('bookmarkDisplayFormat', this.bookmarkDisplayFormat);
      }
   },
   incrementRedirects(id: SUUID | undefined) {
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

         const redirects = this.bookmarks.find(bookmark => bookmark.id === id)!.redirects + 1 || 1;
         const result = { id, redirects } as never;
         client
            .from('bookmarks')
            .update(result)
            .eq('id', id)
            .then(() => {
               console.log('Bookmark redirects incremented');
            });
      }
   },
   async loadBookmarks({ mostUsed = false, onlySaveLater = false }: { mostUsed?: boolean, onlySaveLater?: boolean } = {}): Promise<void> {
      this.bookmarksLoaded = false;
      if (process.client) {
         const user = useSupabaseUser().value;
         const client = useSupabaseClient();

         if (user === null) {
            let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]') as Bookmark[];

            if (mostUsed) {
               bookmarks = bookmarks
                  .filter(bookmark => bookmark.redirects > 0)
                  .sort((a, b) => b.redirects - a.redirects);
            }

            if (onlySaveLater) {
               bookmarks = bookmarks.filter(bookmark => bookmark.saved_later);
            }

            this.bookmarks = bookmarks;
            this.bookmarksLoaded = true;
            return;
         }

         const query = client
            .from('bookmarks')
            .select('*')
            .eq('user_id', user.id)
            .limit(mostUsed ? 10 : 100);

         if (mostUsed) query.gt('redirects', 0);
         if (!mostUsed) query.order('last_used', { ascending: false });

         if (onlySaveLater) query.eq('saved_later', true);

         let { data } = await query;
         data = data?.map((bookmark: any) => ({
            ...bookmark,
            last_used: new Date(bookmark.last_used),
            tags: (bookmark.tags || []) as Tag[]
         })) as any;

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
                  bookmark.id = short.generate();
                  bookmark.redirects = 0;
               });

               localStorage.setItem('bookmarks', JSON.stringify([...this.bookmarks, ...data]));
               this.bookmarks.push(...data);
               return;
            }

            data.id = short.generate();
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
   async deleteBookmark(id: SUUID | undefined) {
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
   },
   async saveLater(id: SUUID | undefined) {
      // save to later (in the table there is a column called "saved_later" which is a boolean)
      if (id === undefined) return;

      if (process.client) {
         const user = useSupabaseUser().value;
         const client = useSupabaseClient();

         if (user === null) {
            const bookmark = this.bookmarks.find(bookmark => bookmark.id === id);
            if (bookmark !== undefined) {
               bookmark.saved_later = !bookmark.saved_later;
               localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
            }

            return;
         }

         const saved_later = !this.bookmarks.find(bookmark => bookmark.id === id)!.saved_later;
         const result = { id, saved_later } as never;
         client
            .from('bookmarks')
            .update(result)
            .eq('id', id)
            .then(() => {
               console.log('Bookmark saved later');
            });
      }
   }
};