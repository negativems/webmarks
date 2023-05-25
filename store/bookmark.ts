import { Bookmark, BookmarkDisplayFormat, BookmarkDraft, Tag } from "~/types/types";
import { defineStore } from 'pinia';

// Create from scratch the above store
export const useBookmark = defineStore('bookmark', {
   state: () => ({
      bookmarks: [] as Bookmark[],
      bookmarksLoaded: false,
      bookmarkDisplayFormat: 'rows' as BookmarkDisplayFormat,
      localBookmarksIndex: 0,
      insertingBookmarks: 0
   }),
   getters: {
      tags(state): Tag[] {
         return state.bookmarks.map(bookmark => bookmark.tags)
            .flat()
            .filter((tag, index, self) => index === self.findIndex(t => t.name === tag.name));
      },
   },
   actions: {

      /**
       * Loads bookmarks from the database or from localStorage to the store
       * @param object{
       *    mostUsed?: boolean To order bookmarks by most used
       *    onlySaveLater?: boolean To only get bookmarks that are saved later
       * }
       */
      load({ mostUsed = false, onlySaveLater = false }: { mostUsed?: boolean, onlySaveLater?: boolean } = {}) {
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
                  bookmarks = bookmarks.filter(bookmark => bookmark.isFavourite);
               }

               // Load some tags
               bookmarks.forEach(bookmark => {
                  bookmark.tags = [
                     { name: 'tag1', color: '#FF0000' },
                     { name: 'tag2', color: '#FFFF00' },
                  ];
               });

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

            query.then(({ data }) => {
               data = data?.map((bookmark: any) => ({
                  ...bookmark,
                  last_used: new Date(bookmark.last_used),
                  tags: (bookmark.tags || []) as Tag[]
               })) as any;

               this.bookmarks = (data || []) as Bookmark[];
               this.bookmarksLoaded = true;
            });
            return;
         }

         this.bookmarks = [];
      },

      /**
       * Adds a bookmark to the store or to the database
       * @param bookmark The bookmark to add
       */
      add(bookmark: Bookmark | BookmarkDraft) {
         if (this.bookmarks === undefined) return;

         if (process.client) {
            const user = useSupabaseUser().value;
            const client = useSupabaseClient();

            if (user === null) {
               bookmark.id = this.localBookmarksIndex++;
               bookmark.redirects = 0;
               localStorage.setItem('bookmarks', JSON.stringify([...this.bookmarks, bookmark]));
               this.bookmarks.push(bookmark as Bookmark);
               return;
            }

            bookmark.user_id = user.id;

            client
               .from('bookmarks')
               .insert(bookmark as never)
               .then(() => this.bookmarks.push(bookmark as Bookmark));
         }
      },

      /**
       * Adds multiple bookmarks to the store or to the database
       * If the bookmarks are added to the database it needs to be
       * a queue of 10 bookmarks in a single request
       * @param bookmarks The bookmarks to add
       */
      addMultiple(bookmarks: BookmarkDraft[] | Bookmark[]) {
         if (this.bookmarks === undefined) return;

         if (process.client) {
            const user = useSupabaseUser().value;
            const client = useSupabaseClient();

            if (user === null) {
               bookmarks.forEach(bookmark => {
                  bookmark.id = this.localBookmarksIndex++;
                  bookmark.redirects = 0;
               });

               localStorage.setItem('bookmarks', JSON.stringify([...this.bookmarks, ...bookmarks]));
               this.bookmarks.push(...bookmarks as Bookmark[]);
               return;
            }

            bookmarks.forEach(bookmark => bookmark.user_id = user.id);

            // Now we need to split the bookmarks into chunks of 10
            const chunks = [] as Bookmark[][];
            for (let i = 0; i < bookmarks.length; i += 10) {
               chunks.push(bookmarks.slice(i, i + 10) as Bookmark[]);
            }

            chunks.forEach((chunk: Bookmark[]) => {
               client.from('bookmarks').insert(chunk as any).then(() => {
                  this.bookmarks.push(...chunk);
               });


               this.insertingBookmarks += chunk.length;
            });

            this.insertingBookmarks = 0;
         }
      },

      /**
       * Deletes a bookmark from the store or from the database
       * @param bookmarkId The id of the bookmark to delete
       */
      delete(bookmarkId: number) {
         if (bookmarkId === undefined) return;

         if (process.client) {
            const user = useSupabaseUser().value;
            const client = useSupabaseClient();

            if (user === null) {
               const newBookmarks = this.bookmarks.filter(bookmark => bookmark.id !== bookmarkId);
               localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
               this.bookmarks = newBookmarks;
               return;
            }

            client.from('bookmarks').delete().eq('id', bookmarkId).then(() => {
               this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== bookmarkId);
               console.log('Bookmark deleted');
            });
         }
      },

      /**
       * Saves a bookmark for later
       * @param bookmarkId The id of the bookmark to save later
       */
      favourite(bookmarkId: number) {
         // save to later (in the table there is a column called "saved_later" which is a boolean)
         if (bookmarkId === undefined) return;

         const bookmarks = this.bookmarks || [];

         if (process.client) {
            const user = useSupabaseUser().value;
            const client = useSupabaseClient();

            if (user === null) {
               const bookmark = bookmarks.find(bookmark => bookmark.id === bookmarkId);
               if (bookmark !== undefined) {
                  bookmark.isFavourite = !bookmark.isFavourite;
                  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
               }
               return;
            }

            const isFavourite = !bookmarks.find(bookmark => bookmark.id === bookmarkId)!.isFavourite;
            const result = { id: bookmarkId, is_favourite: isFavourite } as never;
            client
               .from('bookmarks')
               .update(result)
               .eq('id', bookmarkId)
               .then(() => {
                  console.log('Bookmark saved later');
               });
         }
      },

      /**
  * Loads the bookmark display format from localStorage
  */
      loadBookmarkDisplayFormat() {
         if (process.client && localStorage.getItem('bookmarkDisplayFormat') !== null) {
            this.bookmarkDisplayFormat = localStorage.getItem('bookmarkDisplayFormat') as BookmarkDisplayFormat;
         }
      },

      /**
       * Toggle the bookmark display format between rows and cards
       */
      toggleBookmarkDisplayFormat() {
         this.bookmarkDisplayFormat = this.bookmarkDisplayFormat === 'rows' ? 'cards' : 'rows';

         if (process.client) {
            localStorage.setItem('bookmarkDisplayFormat', this.bookmarkDisplayFormat);
         }
      },

      /**
       * Increments the clicked times of a bookmark
       * @param bookmarkId The id of the bookmark to increment the redirects
       */
      addClickTo(bookmarkId: number) {
         if (bookmarkId === undefined) return;

         if (process.client) {
            const user = useSupabaseUser().value;
            const client = useSupabaseClient();

            if (user === null) {
               const bookmark = this.bookmarks.find(bookmark => bookmark.id === bookmarkId);
               if (bookmark !== undefined) {
                  bookmark.redirects++;
                  localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
               }

               return;
            }

            const redirects = this.bookmarks.find(bookmark => bookmark.id === bookmarkId)!.redirects + 1 || 1;
            const result = { id: bookmarkId, redirects } as never;
            client
               .from('bookmarks')
               .update(result)
               .eq('id', bookmarkId)
               .then(() => {
                  console.log('Bookmark redirects incremented');
               });
         }
      },
   }
});