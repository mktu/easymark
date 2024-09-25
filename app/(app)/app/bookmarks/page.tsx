import { createClientForServer } from "@/lib/supabase/supabaseServer"
import { redirect } from "next/navigation"
import { fetchCategories } from "@/lib/repositories/categories"
import Bookmarks from "./_components/Bookmarks"
import BookmarkListContainer from "./_components/BookmarkListContainer"
import { Suspense } from "react"
import { getSortOption } from "./_utils/parseSortOption"
import BookmarkSkelton from "./_components/BookmarkSkelton"
import { parseNumber } from "@/lib/urlParser"


export default async function Bookmark({ searchParams }: {
    params: { id: string },
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const supabase = createClientForServer()
    const { data: userData, error } = await supabase.auth.getUser()
    if (error || !userData?.user) {
        redirect('/signin')
    }
    const filter = searchParams.filter as string | ''
    const sortOption = getSortOption(searchParams)
    const category = parseNumber(searchParams, 'category', null);
    const categories = await fetchCategories(supabase, userData.user.id);

    return <Bookmarks
        categories={categories}
        bookmarklist={
            <Suspense key={filter + sortOption + category} fallback={<BookmarkSkelton />}>
                <BookmarkListContainer
                    filter={filter}
                    category={category}
                    sortOption={sortOption}
                    categories={categories}
                />
            </Suspense>

        } />
}