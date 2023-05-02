export interface Bookmark {
   title: string;
   url: string;
   user_id?: string | undefined;
   id?: number;
   description?: string;
}

export type BookmarkDisplayFormat = 'columns' | 'cards';