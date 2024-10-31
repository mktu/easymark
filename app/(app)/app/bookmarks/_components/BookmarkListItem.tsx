'use client'
import BrowserTime from "@/components/domain/BrowserTime"
import Link from "next/link"
import { FC } from "react"
import { BookmarkType } from "@/lib/repositories/bookmarks"
import OgpImage from "@/components/domain/OgpImage"
import { CategoryType } from "@/lib/repositories/categories"
import { BookmarkTagsType } from "@/lib/repositories/bookmark_tags"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import TagItem from "@/components/domain/TagItem"
import OpenLinkButton from "@/components/domain/OpenLinkButton"
import { handleVisitBookmark } from "../../_actions/handleVisitBookmark"

type Props = {
    bookmark: BookmarkType,
    tags?: BookmarkTagsType[0],
    category?: CategoryType,
    onCheck?: (checked: boolean) => void
    checked?: boolean
    onDelete?: () => void
}

const ImageSize = 64

const BookmarkListItem: FC<Props> = ({
    bookmark,
    category,
    tags,
    checked,
    onCheck,
    onDelete
}) => {
    const { bookmarkId, ogpImage, ogpTitle, url, createdAt, ogpDescription } = bookmark
    return (
        <div className="flex items-center gap-2">
            <Checkbox className="border-muted-foreground bg-background" checked={checked}
                onCheckedChange={(c) => {
                    onCheck && onCheck(c === true)
                }} />
            <Link href={`/app/bookmarks/${bookmarkId}`}
                style={{ borderLeftColor: category?.color || 'transparent' }}
                className='relative flex w-full gap-2 border-l-4 p-2 shadow'>

                <OgpImage image={ogpImage} alt={ogpTitle || ''} width={ImageSize} height={ImageSize} />
                <div className='flex w-full items-start gap-2'>
                    <div className='flex size-full flex-col'>
                        <div className="underline text-sm">{ogpTitle || url}</div>
                        <p className='line-clamp-2 text-xs'>{ogpDescription}</p>
                        <div className="mt-auto flex w-full items-end gap-2 text-xs">
                            <span className="mr-2"><BrowserTime timestamp={createdAt} /></span>
                            {tags && tags.map(tag => (
                                <TagItem key={tag.id} tag={tag} />
                            ))}
                        </div>
                    </div>
                    <div className="ml-auto flex h-full flex-col items-end">
                        <div className='flex items-center'>
                            <OpenLinkButton url={url} onClick={() => {
                                handleVisitBookmark(bookmarkId)
                            }} />
                        </div>
                    </div>

                </div>
            </Link>
        </div>
    )
}

export default BookmarkListItem