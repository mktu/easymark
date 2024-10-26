import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CategoryType } from "@/lib/repositories/categories"
import { cn } from "@/lib/utils"
import { LayoutGridIcon, TagIcon, Trash2Icon } from "lucide-react"
import { FC } from "react"
import UpdateCategory from "./UpdateCategory"
import UpdateTags from "./UpdateTags"
import { handleDeleteBookmarks } from "../../_actions/handleDeleteBookmarks"
import { useSignalContext } from "@/contexts/signal"
import { PopoverClose } from "@radix-ui/react-popover"
import { toast } from "sonner"

type Props = {
    categories: CategoryType[],
    bookmarks: number[]
}

const BulkUpdate: FC<Props> = ({
    categories,
    bookmarks
}) => {
    const { fireBookmarkReloadSignal } = useSignalContext()
    return (
        <div className={cn('flex items-center gap-2 transition-transform duration-500 ease-in-out transform',
            bookmarks.length > 0 ? 'opacity-100' : 'hidden')}>
            <Popover>
                <PopoverTrigger className="group flex items-center gap-2 text-muted-foreground">
                    <TagIcon className={'size-6 stroke-muted-foreground'} />
                </PopoverTrigger>
                <PopoverContent className="flex w-[320px]">
                    <UpdateTags
                        bookmarks={bookmarks}
                    />
                </PopoverContent>
            </Popover>
            <Popover>
                <PopoverTrigger className="group flex items-center gap-2 text-muted-foreground">
                    <LayoutGridIcon className={'size-6 stroke-muted-foreground'} />
                </PopoverTrigger>
                <PopoverContent className="w-[320px]">
                    <UpdateCategory categories={categories} bookmarks={bookmarks} />
                </PopoverContent>
            </Popover>
            <Popover>
                <PopoverTrigger className="group mx-1 flex items-center gap-2 text-muted-foreground">
                    <Trash2Icon className={'size-6 stroke-muted-foreground'} />
                </PopoverTrigger>
                <PopoverContent className="flex w-[320px] flex-col gap-2">
                    <p>Are you sure to delete items?</p>
                    <PopoverClose asChild>
                        <Button className="ml-auto w-fit" onClick={async () => {
                            const result = await handleDeleteBookmarks(bookmarks)
                            if (result.error) {
                                console.error(result.error)
                                toast.error(result.error)
                                return
                            }
                            fireBookmarkReloadSignal(true)
                        }} variant='destructive'>
                            DELETE
                        </Button>
                    </PopoverClose>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default BulkUpdate