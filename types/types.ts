export interface Tag {
   name: string
   color: string
}

// Interface for a bookmark that still needs to be saved to the database so it doesn't have an id or an user_id
export interface BookmarkDraft {
   title: string
   url: string
   last_used: Date
   id?: number
   redirects?: number
   tags?: Tag[]
   saved_later?: boolean
   user_id?: string | undefined
   description?: string
}

export interface Bookmark {
   id: number
   title: string
   url: string
   redirects: number
   last_used: Date
   tags: Tag[]
   is_favourite: boolean
   user_id?: string | undefined
   description?: string
   favicon?: string | null
}

export type BookmarkDisplayFormat = 'rows' | 'cards'

export type BookmarkFilterTagType = 'restrictive' | 'individual'

export interface UserProfile {
   id: string
   plan: 'pro' | 'premium' | undefined
}