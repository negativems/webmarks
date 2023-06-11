import { Bookmark, BookmarkDisplayFormat, BookmarkDraft, BookmarkFilterTagType, Tag } from "~/types/types";
import { defineStore } from 'pinia';

// Create from scratch the above store
export const useBookmark = defineStore('bookmark', {
   state: () => ({
      bookmarks: [] as Bookmark[],
      bookmarksLoaded: false,
      bookmarkDisplayFormat: 'rows' as BookmarkDisplayFormat,
      bookmarkFilterTagType: 'individual' as BookmarkFilterTagType,
      localBookmarksIndex: 0,
      insertingBookmarks: 0,
      selectedTags: [] as string[],
   }),
   getters: {
      /**
       * 
       * @param state 
       */
      getTags(state): () => Tag[] {
         const tags = new Set<Tag>();

         state.bookmarks
            .map(bookmark => bookmark.tags)
            .flat()
            // Remove null tags and duplicates name
            .filter((tag, index, self) => tag && self.findIndex(t => t.name === tag.name) === index)
            .forEach(tag => {
               tags.add(tag);
            });

         return () => Array.from(tags);
      },
      find: (state) => (bookmarkId: number) => {
         return state.bookmarks.find(bookmark => bookmark.id === bookmarkId);
      },
      hasBookmarks(state): boolean {
         return state.bookmarks.length > 0;
      },

      /**
       * Returns true if there is more than one bookmark with the same title or url in the store
       */
      exists: (state) => ({ title = "", url = "" }: { title?: string, url?: string }): boolean => {
         // Check that there is a title or url
         if (!title && !url) {
            console.error("There was an error checking if a bookmark exists: no title or url was provided");
            return false;
         }

         return state.bookmarks.filter(bookmark => {
            if (title && bookmark.title === title) return true;
            if (url && bookmark.url === url) return true;
            return false;
         }).length > 1;
      },
   },
   actions: {
      toggleTag(name: string) {
         if (this.selectedTags.includes(name)) {
            this.unselectTag(name);
         } else {
            this.selectedTags.push(name);
         }
      },

      unselectTag(name: string) {
         console.log("unselecting tag", name);
         
         this.selectedTags = this.selectedTags.filter(tag => tag !== name);
      },

      /**
       * Returns true if there more than one tag with the same name in the store
       */
      existsTag: (name: string, bookmark?: Bookmark): boolean => {
         const tags = [] as Tag[];

         if (bookmark) {
            tags.push(...bookmark.tags);
         } else {
            tags.push(...useBookmark().getTags());
         }

         return tags?.some(tag => tag.name === name);
      },


      /**
       * Loads bookmarks from the database or from localStorage to the store
       * @param object{
       *    mostUsed?: boolean To order bookmarks by most used
       *    onlySaveLater?: boolean To only get bookmarks that are saved later
       * }
       */
      load({ mostUsed = false, favourite = false }: { mostUsed?: boolean, favourite?: boolean } = {}) {
         this.bookmarksLoaded = false;
         if (process.client) {
            const user = useSupabaseUser().value;
            const supabase = useSupabaseClient();

            if (user === null) {
               let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]') as Bookmark[];

               // Fix ids
               // bookmarks = bookmarks.map((bookmark, index) => {
               //    bookmark.id = index + 1;
               //    return bookmark;
               // });

               if (mostUsed) {
                  bookmarks = bookmarks
                     .filter(bookmark => bookmark.redirects > 0)
                     .sort((a, b) => b.redirects - a.redirects);
               }

               if (favourite) {
                  bookmarks = bookmarks.filter(bookmark => bookmark.is_favourite);
               }

               this.bookmarks = bookmarks;
               this.localBookmarksIndex = bookmarks.length;
               this.bookmarksLoaded = true;
               return;
            }

            const query = supabase
               .from('bookmarks')
               .select('*')
               .eq('user_id', user.id)
               .limit(mostUsed ? 10 : 100);

            if (mostUsed) query.gt('redirects', 0);
            if (!mostUsed) query.order('last_used', { ascending: false });

            if (favourite) query.eq('is_favourite', true);

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
      },

      /**
       * Adds a bookmark to the store or to the database
       * @param bookmark The bookmark to add
       */
      add(bookmark: Bookmark | BookmarkDraft) {
         if (this.bookmarks === undefined) return;

         if (process.client) {
            const user = useSupabaseUser().value;
            const supabase = useSupabaseClient();

            if (user === null) {
               bookmark.id = this.localBookmarksIndex++;
               bookmark.redirects = 0;
               localStorage.setItem('bookmarks', JSON.stringify([...this.bookmarks, bookmark]));
               this.bookmarks.push(bookmark as Bookmark);
               return;
            }

            bookmark.user_id = user.id;

            console.log('Bookmark added', bookmark);
            
            supabase
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
            const supabase = useSupabaseClient();

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
               supabase.from('bookmarks').insert(chunk as any).then(() => {
                  this.bookmarks.push(...chunk);
               });


               this.insertingBookmarks += chunk.length;
            });

            this.insertingBookmarks = 0;
         }
      },

      edit(bookmark: Bookmark) {
         if (process.client) {
            console.log('Bookmark edited', bookmark);
            
            if (bookmark === undefined) {
               console.error('Error editing bookmark, bookmark is undefined');
               return;
            }

            const user = useSupabaseUser().value;
            const supabase = useSupabaseClient();

            if (user === null) {
               this.bookmarks = this.bookmarks.map(bookmark => bookmark.id === bookmark.id ? bookmark : bookmark);
               localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
               return;
            }

            // Removes favicon from bookmark for supabase
            const { favicon, ...supabaseBookmark } = bookmark;

            supabase
               .from('bookmarks')
               .update(supabaseBookmark as never)
               .eq('id', bookmark.id)
               .then(() => {
                  // Updates the bookmark in the store after it has been updated in the database
                  this.bookmarks = this.bookmarks.map(bookmark => bookmark.id === bookmark.id ? bookmark : bookmark);
               });
         }
      },

      /**
       * Deletes a bookmark from the store or from the database
       * @param bookmarkId The id of the bookmark to delete
       */
      delete(bookmarkId: number) {
         console.log('Deleting bookmark', bookmarkId);
         if (bookmarkId === undefined) return;

         if (process.client) {
            const user = useSupabaseUser().value;
            const supabase = useSupabaseClient();

            if (user === null) {
               const newBookmarks = this.bookmarks.filter(bookmark => bookmark.id !== bookmarkId);
               localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
               this.bookmarks = newBookmarks;
               return;
            }

            supabase.from('bookmarks').delete().eq('id', bookmarkId).then(() => {
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
            const supabase = useSupabaseClient();

            if (user === null) {
               const bookmark = bookmarks.find(bookmark => bookmark.id === bookmarkId);
               if (bookmark !== undefined) {
                  bookmark.is_favourite = !bookmark.is_favourite;
                  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
               }
               return;
            }

            const isFavourite = !bookmarks.find(bookmark => bookmark.id === bookmarkId)!.is_favourite;
            const result = { id: bookmarkId, is_favourite: isFavourite } as never;
            supabase
               .from('bookmarks')
               .update(result)
               .eq('id', bookmarkId)
               .then(
                  (e) => {
                     console.log('Bookmark added to favourite', e);
                     this.bookmarks.map((bookmark) => {
                        if (bookmark.id === bookmarkId) {
                           bookmark.is_favourite = isFavourite;
                        }
                     });
                  },
                  (e) => {
                     console.error('Error adding bookmark to favourite', e);
                  }
               );
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

      loadBookmarkFilterTagType() {
         if (process.client && localStorage.getItem('bookmarkFilterTagType') !== null) {
            this.bookmarkFilterTagType = localStorage.getItem('bookmarkFilterTagType') as BookmarkFilterTagType;
         }
      },

      toggleFilterTagType() {
         this.bookmarkFilterTagType = this.bookmarkFilterTagType === 'restrictive' ? 'individual' : 'restrictive';

         if (process.client) {
            localStorage.setItem('bookmarkFilterTagType', this.bookmarkFilterTagType);
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
            const supabase = useSupabaseClient();

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
            supabase
               .from('bookmarks')
               .update(result)
               .eq('id', bookmarkId)
               .then(() => {
                  console.log('Bookmark redirects incremented');
               });
         }
      },

      /**
       * Add a tag to a bookmark
       */
      addTag(bookmarkId: number, tagName: string, color: string = "#60ffa8"): Tag | undefined {
         if (bookmarkId === undefined) return;
         if (this.getTags().some(tag => tag.name === tagName)) return;

         if (process.client) {
            const user = useSupabaseUser().value;
            const supabase = useSupabaseClient();

            const tag = { name: tagName, color };

            if (user === null) {
               const bookmark = this.bookmarks.find(bookmark => bookmark.id === bookmarkId);
               if (bookmark !== undefined) {
                  if (bookmark.tags === undefined) bookmark.tags = [];
                  
                  bookmark.tags.push(tag);
                  localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
                  console.log('Bookmark tag added');
               }

               return tag;
            }

            const bookmark = this.bookmarks.find(bookmark => bookmark.id === bookmarkId);
            if (bookmark === undefined) {
               console.error('Error adding tag to bookmark: bookmark not found');
               return;
            }

            if (bookmark.tags === undefined) bookmark.tags = [];

            const tags = bookmark.tags;
            tags.push(tag);
            const result = { id: bookmarkId, tags } as never;
            supabase
               .from('bookmarks')
               .update(result)
               .eq('id', bookmarkId)
               .then(() => {
                  console.log('Bookmark tag added');
               });

            return tag;
         }
      },

      updateTag(bookmarkId: number, tagName: string, updatedName: string, color: string = "#60ffa8") {
         if (bookmarkId === undefined) return;

         const bookmark = this.bookmarks.find(bookmark => bookmark.id === bookmarkId);
         if (bookmark === undefined) return;

         if (process.client) {
            const user = useSupabaseUser().value;
            const supabase = useSupabaseClient();

            if (user === null) {
               const bookmark = this.bookmarks.find(bookmark => bookmark.id === bookmarkId);
               if (bookmark !== undefined) {
                  bookmark.tags = bookmark.tags.map(tag => {
                     if (tag.name === tagName) {
                        tag.name = updatedName;
                        tag.color = color;
                     }

                     return tag;
                  });
                  localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
                  console.log('Bookmark tag updated');
               }

               return;
            }

            const tags = bookmark.tags;
            tags.forEach(tag => {
               if (tag.name === tagName) {
                  tag.name = updatedName;
                  tag.color = color;
               }
            });
            const result = { id: bookmarkId, tags } as never;
            supabase
               .from('bookmarks')
               .update(result)
               .eq('id', bookmarkId)
               .then(() => {
                  console.log('Bookmark tag updated');
               });
         }
      },

      /**
       * Delete a tag from a bookmark
       */
      deleteTag(tagName: string, bookmarkId?: number) {
         if (tagName === undefined || !this.existsTag(tagName)) {
            console.error('Error deleting tag from bookmark: tag not found');
            return;
         }

         if (process.client) {
            const user = useSupabaseUser().value;
            const supabase = useSupabaseClient();

            if (user === null) {
               let bookmarks = this.bookmarks.filter(bookmark => bookmark.tags.some(tag => tag.name === tagName));
               if (bookmarkId) {
                  bookmarks = bookmarks.filter(bookmark => bookmark.id === bookmarkId);
               }

               bookmarks.forEach(bookmark => {
                  bookmark.tags = bookmark.tags.filter(tag => tag.name !== tagName);
               });

               localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
               console.log('Bookmark tag deleted');

               return;
            }

            let bookmarks = this.bookmarks.filter(bookmark => bookmark.tags.some(tag => tag.name === tagName));
            if (bookmarkId) {
               bookmarks = bookmarks.filter(bookmark => bookmark.id === bookmarkId);
            }

            console.log("There are " + bookmarks.length + " bookmarks with tag " + tagName);
            
            bookmarks = bookmarks.map(bookmark => {
               bookmark.tags = bookmark.tags.filter(tag => tag.name !== tagName);
               supabase
                  .from('bookmarks')
                  .update({ tags: bookmark.tags } as never)
                  .eq('id', bookmark.id)
                  .then(() => {
                     console.log('Bookmark tag ' + tagName + " deleted from bookmark " + bookmark.title);
                  });
               return bookmark;
            });
         }
      }
   }
});