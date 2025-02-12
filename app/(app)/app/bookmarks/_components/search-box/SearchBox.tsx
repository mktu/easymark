import { InputWithIcon } from "@/components/domain/InputWithIcon"
import { Button } from "@/components/ui/button"
import { Command } from "@/components/ui/command"
import { CategoryType } from "@/lib/repositories/categories"
import { TagUsageType } from "@/lib/repositories/tag_usage"
import { SearchIcon, XCircle } from "lucide-react"
import { FC } from "react"
import Suggestion from "./Suggestion"
import SearchCommandMenu from "./SearchCommandMenu"

type Props = {
    searchText?: string,
    onChangeSearchText: (_: string) => void,
    onSelectTag: (_: TagUsageType) => void,
    onSelectCategory: (_: CategoryType) => void,
    onAddCommand?: (_: string) => void,
    selectableTags: TagUsageType[],
    selectableCategories: CategoryType[],
    isSuggesting: boolean
}

const SearchBox: FC<Props> = ({
    searchText,
    onChangeSearchText,
    onSelectTag,
    onSelectCategory,
    onAddCommand,
    selectableTags,
    selectableCategories,
    isSuggesting
}) => {
    return (
        <Command loop shouldFilter={false} className="overflow-visible">
            <InputWithIcon placeholder="Search Bookmarks"
                leftIcon={<SearchIcon className='size-4 text-muted-foreground' />}
                rightIcon={
                    <>
                        <SearchCommandMenu onSelectCommand={onAddCommand} className={searchText && `rounded-r-none`} />
                        {searchText && (
                            <Button className="rounded-l-none border-l" variant={'ghost'} size='icon' onClick={() => {
                                onChangeSearchText('')
                            }}>
                                <XCircle className='size-4 text-muted-foreground' />
                            </Button>
                        )}
                    </>
                }
                className="w-full pl-4 md:w-[400px]"
                value={searchText}
                onChange={(e) => {
                    onChangeSearchText(e.target.value)
                }} />
            <div className='relative mt-1 w-[400px]'>
                <Suggestion
                    selectableTags={selectableTags}
                    selectableCategories={selectableCategories}
                    isSuggesting={isSuggesting}
                    onSelectTag={onSelectTag}
                    onSelectCategory={onSelectCategory}
                />
            </div>
        </Command>
    )
}

export default SearchBox