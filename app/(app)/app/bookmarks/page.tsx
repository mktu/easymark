import { createClientForServer } from "@/lib/supabase/supabaseServer"
import { redirect } from "next/navigation"
import { getCategories } from "@/lib/repositories/categories"
import Bookmarks from "./_components/Bookmarks"
import BookmarkListContainer from "./_components/BookmarkListContainer"
import { Suspense } from "react"
import { getSortOption } from "./_utils/parseSortOption"
import BookmarkSkelton from "./_components/BookmarkSkelton"
import { parseNumber, parseNumberArray } from "@/lib/urlParser"
import { getTagUsage, getTagUsageByTags } from "@/lib/repositories/tag_usage"


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
    const tags = parseNumberArray(searchParams, 'tags', []);
    const categories = await getCategories(supabase, userData.user.id);
    const tagUsages = tags ? await getTagUsageByTags(supabase, userData.user.id, tags) : [];
    if ('error' in tagUsages) {
        throw new Error(tagUsages.error)
    }

    return <Bookmarks
        categories={categories}
        tags={tagUsages}
        bookmarklist={
            <Suspense key={filter + sortOption + category + tags?.join(',')} fallback={<BookmarkSkelton />}>
                <BookmarkListContainer
                    tags={tags}
                    filter={filter}
                    category={category}
                    sortOption={sortOption}
                    categories={categories}
                />
            </Suspense>
        } />
}