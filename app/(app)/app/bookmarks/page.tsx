import { createClientForServer } from "@/lib/supabase/supabaseServer"
import { redirect } from "next/navigation"
import { getCategories } from "@/lib/repositories/categories"
import Bookmarks from "./_components/Bookmarks"
import BookmarkListContainer from "./_components/BookmarkListContainer"
import { Suspense } from "react"
import { getSortOption } from "./_utils/parseSortOption"
import BookmarkSkelton from "./_components/BookmarkSkelton"
import { parseNumber, parseNumberArray } from "@/lib/urlParser"
import { TagUsageType } from "@/lib/repositories/tag_usage"


export default async function Bookmark({ searchParams }: {
    params: { id: string },
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const supabase = createClientForServer()
    const { data: userData, error } = await supabase.auth.getUser()
    if (error || !userData?.user) {
        redirect('/signin')
    }
    let filter = searchParams.filter as string | ''
    const sortOption = getSortOption(searchParams)
    let category = parseNumber(searchParams, 'category', null);
    let tags = parseNumberArray(searchParams, 'tags', []);
    const tagUsages: TagUsageType[] = [];
    const query = searchParams.query ? decodeURIComponent(searchParams.query as string) : '';
    const categories = await getCategories(supabase, userData.user.id);

    return <Bookmarks
        categories={categories}
        tags={tagUsages}
        query={query}
        bookmarklist={
            <Suspense key={query} fallback={<BookmarkSkelton />}>
                <BookmarkListContainer
                    tags={tags}
                    filter={filter}
                    category={category}
                    categories={categories}
                    sortOption={sortOption}
                    query={query}
                />
            </Suspense>
        } />
}