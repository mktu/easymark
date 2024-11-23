import { createClientForServer } from "@/lib/supabase/supabaseServer"
import { redirect } from "next/navigation"
import { getCategories } from "@/lib/repositories/categories"
import Bookmarks from "./_components/Bookmarks"
import BookmarkListContainer from "./_components/BookmarkListContainer"
import { Suspense } from "react"
import { getSortOption } from "./_utils/parseSortOption"
import BookmarkSkelton from "./_components/BookmarkSkelton"
import { convertTagToQuery } from "./_utils/convertToQuery"


export default async function Bookmark({ searchParams }: {
    params: { id: string },
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const supabase = createClientForServer()
    const { data: userData, error } = await supabase.auth.getUser()
    if (error || !userData?.user) {
        redirect('/signin')
    }
    const sortOption = getSortOption(searchParams)
    const query = searchParams.query ? decodeURIComponent(searchParams.query as string) : '';
    const categories = await getCategories(supabase, userData.user.id);
    const tag = searchParams.tag;
    if (tag) {
        redirect('/app/bookmarks?query=' + encodeURIComponent(convertTagToQuery(tag)))
    }

    return <Bookmarks
        query={query}
        bookmarklist={
            <Suspense key={query + sortOption} fallback={<BookmarkSkelton />}>
                <BookmarkListContainer
                    categories={categories}
                    sortOption={sortOption}
                    query={query}
                />
            </Suspense>
        } />
}