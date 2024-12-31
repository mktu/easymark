'use client'
import { toast } from "sonner";
import { FC } from "react"
import { BookmarkType } from "@/lib/repositories/bookmarks"
import { useBookmarkUpdate } from "../../../../../../hooks/bookmarks/update/useBookmarkUpdate"
import { CategoryType } from "@/lib/repositories/categories";
import OgpSection from "./OgpSection";
import EditSection from "./EditSection";
import { TagUsageType } from "@/lib/repositories/tag_usage";

type Props = {
    bookmark: BookmarkType,
    categories: CategoryType[],
    tagUsage: TagUsageType[],
    selectedCategoryId?: number
}

const BookmarkContent: FC<Props> = ({
    bookmark,
    categories,
    tagUsage,
    selectedCategoryId
}) => {
    const {
        ogp,
        setNote,
        note,
        refetch,
        category,
        setCategory,
        handleSubmit,
        updateResult,
        handleDelete,
        handleClearTag,
        handleSelectTag,
        registeredTags,
        handleClearAllTags
    } = useBookmarkUpdate(tagUsage, bookmark, selectedCategoryId)
    return (
        <form className='flex w-full flex-col items-start justify-start gap-2 p-4' action={async () => {
            if (await handleSubmit()) {
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
            <EditSection
                note={note}
                setNote={setNote}
                category={category}
                setCategory={setCategory}
                categories={categories}
                result={updateResult}
                registeredTags={registeredTags}
                onSelectTag={handleSelectTag}
                onClearTag={handleClearTag}
                onClearAllTags={handleClearAllTags}
                onDelete={async () => {
                    if (await handleDelete()) {
                        toast('Bookmark deleted')
                    }
                }} />
        </form>
    )
}

export default BookmarkContent