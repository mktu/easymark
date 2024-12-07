'use client'
import { FC, ReactNode } from "react"
import { BookIcon } from "lucide-react"
import { useBookmarkQuery } from "../_hooks/useBookmarkQuery"
import SearchBox from "./search-box/SearchBox"

type Props = {
    bookmarklist: ReactNode,
    query: string
}

const Bookmarks: FC<Props> = ({ bookmarklist, query }) => {
    const {
        input,
        onUpdate,
        selectableTags,
        selectableCategories,
        onSelectSuggestion,
        onAddCommand,
        isSuggesting
    } = useBookmarkQuery(query)
    return (
        <section className='flex size-full flex-col items-start justify-start gap-2 p-4'>
            <h2 className='flex items-center gap-2 text-lg font-semibold'>
                <BookIcon className='size-5' />Bookmarks</h2>
            <div className="flex w-full flex-col gap-2 p-2">
                <div className='flex items-center gap-4'>
                    <SearchBox
                        selectableTags={selectableTags}
                        selectableCategories={selectableCategories}
                        searchText={input}
                        onChangeSearchText={onUpdate}
                        onSelectTag={(tag) => {
                            onSelectSuggestion('tag', tag.name)
                        }}
                        onSelectCategory={(category) => {
                            onSelectSuggestion('category', category.name)
                        }}
                        onAddCommand={onAddCommand}
                        isSuggesting={isSuggesting}
                    />
                </div>
            </div>
            {bookmarklist}
        </section>
    )
}

export default Bookmarks