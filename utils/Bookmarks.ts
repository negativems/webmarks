interface Bookmark {
   id: number;
   title: string;
   description: string;
   url: string;
}


export async function hasBookmarks(user: any, client: any): Promise<boolean> {
   if (user.value === null) return false;
   const { data } = await client.from('bookmarks').select('id').eq('user_id', user.value?.id).limit(1);
   return data !== null && data?.length > 0;
}

export async function getBookmarks(user: any, client: any): Promise<Bookmark[]> {
   if (user.value === null) return [];
   const { data } = await client.from('bookmarks').select('id, title, description, url').eq('user_id', user.value?.id).limit(100);
   return (data || []) as Bookmark[];
};

/**
 * This function is used to update the bookmarks in the store.
 */
export async function updateBookmarks(ref: Ref<Bookmark[]>, user: any, client: any) {
   if (user.value === null) return [];
   const { data } = await client.from('bookmarks').select('id, title, description, url').eq('user_id', user.value?.id).limit(100);
   ref.value = data || [];
}

// export async function addBookmark(ref: Ref<Bookmark[]>) {
//    const userId = user.value?.id;
//    const websites = ref.value.map((bookmark: any) => ({ ...bookmark, user_id: userId }));
//    const { data } = await client.from('bookmarks').insert(websites as any);

//    return data;
// }

export async function deleteBookmark(id: number, user: any, client: any, ref?: Ref<Bookmark[]>) {
   if (user.value === null) return [];
   const res = await client.from('bookmarks').delete().eq('id', id);
   if (ref) updateBookmarks(ref, user, client);
   return res;
}