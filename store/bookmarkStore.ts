import { Bookmark } from "~/types/types";
import { type SupabaseClient, User } from "@supabase/supabase-js";

export const bookmarkStore = {
   bookmarks: [] as any,
   async addBookmark(bookmark: Bookmark, user: User | null, client: SupabaseClient) {
      if (user === null) {
         bookmark.id = this.bookmarks.length + 1;
         localStorage.setItem('bookmarks', JSON.stringify([...this.bookmarks, bookmark]));
         this.bookmarks.push(bookmark);
         return;
      }

      client.from('bookmarks').insert(bookmark).then(() => {
         this.bookmarks.push(bookmark);
         console.log('Bookmark added');
      });
   },
   async hasBookmarks(user: User, client: SupabaseClient): Promise<boolean> {
      if (user.id === undefined) return false;

      const { count } = await client.from('bookmarks').select('id').eq('user_id', user.id).limit(1);
      return (count !== null && count > 0);
   },
   async getBookmarks(user: User | null, client: SupabaseClient): Promise<Bookmark[] | null> {
      if (user === null) {
         return JSON.parse(localStorage.getItem('bookmarks') || '[]');
      }

      const { data } = await client.from('bookmarks').select('id, title, description, url').eq('user_id', user.id).limit(100);
      return (data || []) as Bookmark[];
   },
   async deleteBookmark(id: number | undefined, user: User | null, client: SupabaseClient) {
      if (user === null) {
         this.bookmarks = this.bookmarks.filter((bookmark: Bookmark) => bookmark.id !== id);
         localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
         return;
      }

      client.from('bookmarks').delete().eq('id', id).then(() => {
         this.bookmarks = this.bookmarks.filter((bookmark: Bookmark) => bookmark.id !== id);
      });
   }
};