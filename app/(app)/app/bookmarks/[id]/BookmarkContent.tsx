'use client'
import { toast } from "sonner";
import { FC, useState } from "react"
import { BookmarkType } from "@/lib/repositories/bookmarks"
import { useBookmarkUpdate } from "../../hooks/useBookmarkUpdate"
import { handleUpdateBookmark, HandleUpdateBookmarkReturnType } from "../../_actions/handleUpdateBookmark"
import { handleDeleteBookmark } from "../../_actions/handleDeleteBookmark"
import { CategoryType } from "@/lib/repositories/categories";
import OgpSection from "./OgpSection";
import EditSection from "./EditSection";

type Props = {
    bookmark: BookmarkType,
    categories: CategoryType[],
    selectedCategoryId?: number
}

const BookmarkContent: FC<Props> = ({
    bookmark,
    categories,
    selectedCategoryId
}) => {
    const { ogp, setNote, note, refetch, category, setCategory } = useBookmarkUpdate(bookmark, selectedCategoryId)
    const [updateResult, setUpdateResult] = useState<HandleUpdateBookmarkReturnType>()
    return (
        <form className='flex size-full items-start justify-center gap-4 py-2' action={async (form) => {
            const result = await handleUpdateBookmark({
                url: bookmark.url,
                title: ogp?.title || bookmark.ogpTitle,
                description: ogp?.description || bookmark.ogpDescription,
                imageUrl: ogp?.image?.url || bookmark.ogpImage,
                category,
                note
            })
            setUpdateResult(result)
            if (!('success' in result)) {
                return
            }
            toast('Bookmark updated')
        }}>
            <OgpSection
                url={bookmark.url}
                description={ogp?.description || bookmark.ogpDescription}
                image={ogp?.image?.url || bookmark.ogpImage}
                title={ogp?.title || bookmark.ogpTitle}
                onUpdateOgp={refetch}
            />
            <div className='h-full w-0 border border-input bg-input' />
            <EditSection
                note={note}
                setNote={setNote}
                category={category}
                setCategory={setCategory}
                categories={categories}
                result={updateResult}
                onDelete={async () => {
                    const { error } = await handleDeleteBookmark({ bookmarkId: bookmark.bookmarkId })
                    if (error) {
                        console.error(error)
                        //setErrors({ error })
                    } else {
                        toast('Bookmark deleted')
                    }
                }} />

        </form>
    )
}

export default BookmarkContent