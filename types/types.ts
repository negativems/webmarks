export interface Bookmark {
   title: string;
   url: string;
   redirects: number;
   user_id?: string | undefined;
   id?: number;
   description?: string;
}

export type BookmarkDisplayFormat = 'columns' | 'cards';