'use client'
import { toast } from "sonner";
import { FC } from "react"
import { BookmarkType } from "@/lib/repositories/bookmarks"
import { useBookmarkUpdate } from "../../hooks/useBookmarkUpdate"
import { CategoryType } from "@/lib/repositories/categories";
import OgpSection from "./OgpSection";
import EditSection from "./EditSection";
import { TagUsageType } from "@/lib/repositories/tags";

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
        unregisteredTags
    } = useBookmarkUpdate(tagUsage, bookmark, selectedCategoryId)
    return (
        <form className='flex size-full items-start justify-center gap-4 py-2' action={async () => {
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
            <div className='h-full w-0 border border-input bg-input' />
            <EditSection
                note={note}
                setNote={setNote}
                category={category}
                setCategory={setCategory}
                categories={categories}
                result={updateResult}
                registeredTags={registeredTags}
                unregisteredTags={unregisteredTags}
                onSelectTag={handleSelectTag}
                onClearTag={handleClearTag}
                onDelete={async () => {
                    if (await handleDelete()) {
                        toast('Bookmark deleted')
                    }
                }} />

        </form>
    )
}

export default BookmarkContent