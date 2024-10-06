'use client'
import { FC } from "react"
import { useRouter } from "next/navigation"
import { useBookmarkInput } from "../hooks/useBookmarkInput"
import { CategoryType } from "@/lib/repositories/categories"
import OgpSection from "./OgpSection"
import EditSection from "./EditSection"

type Props = {
    categories: CategoryType[],
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
        handleSubmit
    } = useBookmarkInput(selectedCategoryId)
    const router = useRouter();
    return (
        <form className='flex size-full items-start justify-center gap-4 py-2' action={async () => {
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

            <div className='h-full w-0 border border-input bg-input' />

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
            />
        </form>
    )
}

export default NewBookmark