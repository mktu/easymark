'use client'
import { FC, useState } from "react"
import { useRouter } from "next/navigation"
import { useBookmarkInput } from "../hooks/useBookmarkInput"
import { handleAddBookmark, AddBookmarkState } from "../_actions/handleAddBookmark"
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
    const { ogp, setBookmark, bookmark, validBookmark, note, setNote, category, setCategory } = useBookmarkInput(selectedCategoryId)
    const [errors, setErrors] = useState<AddBookmarkState | null>(null)
    const router = useRouter();
    return (
        <form className='flex size-full items-start justify-center gap-4 py-2' action={async () => {
            const result = await handleAddBookmark({
                url: bookmark,
                title: ogp?.title,
                description: ogp?.description,
                imageUrl: ogp?.image?.url,
                note
            })
            if (!('success' in result)) {
                setErrors(result)
                return
            }
            router.back()
        }}>
            <OgpSection
                url={bookmark}
                ogp={ogp}
                setUrl={setBookmark}
                errors={errors}
            />

            <div className='h-full w-0 border border-input bg-input' />

            <EditSection
                note={note}
                setNote={setNote}
                category={category}
                setCategory={setCategory}
                categories={categories}
                validBookmark={!!validBookmark}
            />
        </form>
    )
}

export default NewBookmark