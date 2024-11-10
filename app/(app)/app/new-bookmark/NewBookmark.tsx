'use client'
import { FC } from "react"
import { useRouter } from "next/navigation"
import { useBookmarkInput } from "../hooks/useBookmarkInput"
import { CategoryType } from "@/lib/repositories/categories"
import OgpSection from "./OgpSection"
import EditSection from "./EditSection"

type Props = {
    categories: CategoryType[],
    from?: string | null
    selectedCategoryId?: number
}

const NewBookmark: FC<Props> = ({
    categories,
    selectedCategoryId
}) => {
    const {
        ogp,
        setBookmark,
        bookmark,
        validBookmark,
        note,
        setNote,
        category,
        setCategory,
        handleClearTag,
        handleSelectTag,
        registeredTags,
        addBookmarkResult,
        handleSubmit,
        handleClearAllTags
    } = useBookmarkInput(selectedCategoryId)
    const router = useRouter();
    return (
        <form className='flex size-full flex-col items-start justify-start gap-2 p-4' action={async () => {
            if (!await handleSubmit()) {
                return
            }
            router.back()
        }}>
            <OgpSection
                url={bookmark}
                ogp={ogp}
                setUrl={setBookmark}
                result={addBookmarkResult}
            />
            <EditSection
                note={note}
                setNote={setNote}
                category={category}
                setCategory={setCategory}
                categories={categories}
                validBookmark={!!validBookmark}
                registeredTags={registeredTags}
                onClearTag={handleClearTag}
                onSelectTag={handleSelectTag}
                onClearAllTags={handleClearAllTags}
            />
        </form>
    )
}

export default NewBookmark