'use client'
import BrowserTime from "@/components/domain/BrowserTime"
import Link from "next/link"
import { FC } from "react"
import { SearchBookmarkType } from "@/lib/repositories/bookmarks"
import OgpImage from "@/components/domain/OgpImage"
import { CategoryType } from "@/lib/repositories/categories"
import { Checkbox } from "@/components/ui/checkbox"
import OpenLinkButton from "@/components/domain/OpenLinkButton"
import { handleVisitBookmark } from "@/actions/bookmarks/handleVisitBookmark"
import TagItem from "./TagItem"

type Props = {
    bookmark: SearchBookmarkType,
    category?: CategoryType,
    onCheck?: (_: boolean) => void
    checked?: boolean,
    onSelectTag: (_: string) => void
}

const ImageSize = 64

const BookmarkListItem: FC<Props> = ({
    bookmark,
    category,
    checked,
    onCheck,
    onSelectTag
}) => {
    const { bookmarkId, ogpImage, ogpTitle, url, createdAt, ogpDescription, tagNames } = bookmark
    return (
        <div className="flex items-center gap-2">
            <Checkbox className="border-muted-foreground bg-background" checked={checked}
                onCheckedChange={(c) => {
                    if (onCheck) {
                        onCheck(c === true)
                    }
                }} />
            <Link href={`/app/bookmarks/${bookmarkId}`}
                style={{ borderLeftColor: category?.color || 'transparent' }}
                className='relative flex w-full gap-2 border-l-4 p-2 shadow'>

                <OgpImage image={ogpImage} alt={ogpTitle || ''} width={ImageSize} height={ImageSize} />
                <div className='flex w-full items-start gap-2'>
                    <div className='flex size-full flex-col'>
                        <div className="text-sm underline">{ogpTitle || url}</div>
                        <p className='line-clamp-2 text-xs'>{ogpDescription}</p>
                        <div className="mt-auto flex w-full items-end gap-2 text-xs">
                            <span className="mr-2 truncate"><BrowserTime timestamp={createdAt} /></span>
                            {tagNames && tagNames.map(tag => (
                                <TagItem onClick={(e) => {
                                    e.stopPropagation()
                                    e.preventDefault()
                                    onSelectTag(tag)
                                }} key={tag} tag={{ name: tag }} />
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