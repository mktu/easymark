import { Button } from "@/components/ui/button"
import { TagUsageType } from "@/lib/repositories/tag_usage"
import { useState } from "react"
import { handleUpdateTags } from "../../_actions/handleUpdateTags"
import { useSignalContext } from "@/contexts/signal"
import { PopoverClose } from "@radix-ui/react-popover"
import { TagSelectableInput } from "@/components/domain/TagSetter"

type Props = {
    bookmarks: number[]
}

const UpdateTags = ({
    bookmarks
}: Props) => {
    const [tags, setTags] = useState<TagUsageType[]>([])
    const { fireBookmarkTagSignal } = useSignalContext()
    return (
        <div className="flex w-full flex-col gap-2">
            <label htmlFor="tags" className="whitespace-nowrap text-muted-foreground">Select Tags</label>
            <TagSelectableInput variants={{ size: 'md' }} id={'tags'} registeredTags={tags} onSelectTag={(tag) => {
                setTags(before => [...before, tag])
            }} onClearTag={(tag) => {
                setTags(before => before.filter(t => t.tagId !== tag.tagId))
            }} onClearAll={() => {
                setTags([])
            }} />
            <PopoverClose asChild>
                <Button className="ml-auto w-fit" onClick={async () => {
                    const result = await handleUpdateTags(bookmarks, tags.map(t => t.tagId))
                    if (result.error) {
                        console.error(result.error)
                        return
                    }
                    fireBookmarkTagSignal(true)
                }}>
                    ADD
                </Button>
            </PopoverClose>
        </div>
    )
}

export default UpdateTags