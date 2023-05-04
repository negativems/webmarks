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

         const { data } = await client.from('bookmarks').select('id, title, description, url').eq('user_id', user.id).limit(100);
         this.bookmarks = (data || []) as Bookmark[];
         this.bookmarksLoaded = true;
         return;
      }

      this.bookmarks = [];
   },
   async addBookmark(bookmark: Bookmark) {
      if (this.bookmarks === undefined) return;

      if (process.client) {
         const user = useSupabaseUser().value;
         const client = useSupabaseClient();

         if (user === null) {
            bookmark.id = this.bookmarks.length + 1;
            localStorage.setItem('bookmarks', JSON.stringify([...this.bookmarks, bookmark]));
            this.bookmarks.push(bookmark);
            return;
         }

         bookmark.user_id = user.id;
         client.from('bookmarks').insert(bookmark as any).then(() => {
            this.bookmarks?.push(bookmark);
            console.log('Bookmark added');
         });
      }
   },
   // async hasBookmarks(): Promise<boolean> {
   //    if (process.client) {
   //       const user = useSupabaseUser().value;
   //       const client = useSupabaseClient();

   //       if (user === null) {
   //          const localBookmarks = localStorage.getItem('bookmarks');
   //          return localBookmarks !== null && JSON.parse(localBookmarks).length > 0;
   //       }

   //       const { data } = await client.from('bookmarks').select('id').eq('user_id', user.id).limit(1);
   //       return (data !== null && data.length > 0);
   //    }

   //    return false;
   // },
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