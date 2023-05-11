export interface Tag {
   name: string;
   color: string;
}

export interface Bookmark {
   title: string;
   url: string;
   redirects: number;
   last_used: Date;
   tags: Tag[];
   user_id?: string | undefined;
   id?: number;
   description?: string;
}

export type BookmarkDisplayFormat = 'rows' | 'cards';