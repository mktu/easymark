import { createClientForServer } from "@/lib/supabase/supabaseServer"
import { redirect } from "next/navigation"
import { getCategories } from "@/lib/repositories/categories"
import Bookmarks from "../_components/Bookmarks"
import BookmarkListContainer from "../_components/BookmarkListContainer"
import { Suspense } from "react"
import BookmarkSkelton from "../_components/BookmarkSkelton"
import { getSortOption } from "../../../../../logics/bookmarks/parseSortOption"
import { convertCategoryToQuery, convertTagToQuery } from "../../../../../logics/bookmarks/convertToQuery"


export default async function Bookmark(
    props: {
        params: Promise<{ id: string }>,
        searchParams: Promise<{ [key: string]: string | string[] | undefined }>
    }
) {
    const searchParams = await props.searchParams;
    const supabase = await createClientForServer()
    const { data: userData, error } = await supabase.auth.getUser()
    if (error || !userData?.user) {
        redirect('/signin')
    }
    const sortOption = getSortOption(searchParams)
    const query = searchParams.query ? decodeURIComponent(searchParams.query as string) : '';
    const categories = await getCategories(supabase, userData.user.id);
    const tag = searchParams.tag;
    const category = searchParams.category;
    if (tag) {
        redirect('/app/bookmarks?query=' + encodeURIComponent(convertTagToQuery(tag)))
    }
    if (category) {
        redirect('/app/bookmarks?query=' + encodeURIComponent(convertCategoryToQuery(category)))
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