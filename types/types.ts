import { SUUID } from "short-uuid";

export interface Tag {
   name: string
   color: string
}

export interface Bookmark {
   title: string
   url: string
   redirects: number
   last_used: Date
   tags: Tag[]
   saved_later: boolean
   user_id?: string | undefined
   id?: SUUID
   description?: string
}

export type BookmarkDisplayFormat = 'rows' | 'cards'