'use client'
import BrowserTime from "@/components/domain/BrowserTime"
import { Button } from "@/components/ui/button"
import { ExternalLinkIcon } from "lucide-react"
import Link from "next/link"
import { FC } from "react"
import { useAddBookmarkContext } from "../../_contexts/addBookmarkDialogContext"
import { BookmarkType } from "@/lib/repositories/bookmarks"
import OgpImage from "@/components/domain/OgpImage"

type Props = {
    bookmark: BookmarkType
}

const ImageSize = 92

const BookmarkListItem: FC<Props> = ({
    bookmark
}) => {
    const { open } = useAddBookmarkContext()
    const { bookmarkId, ogpImage, ogpTitle, url, createdAt, ogpDescription } = bookmark
    return (
        <Link href={`/app/bookmarks/${bookmarkId}`} className='flex w-full gap-2 rounded border p-2' onClick={(e) => {
            open(bookmark)
            e.preventDefault()
            e.stopPropagation()
        }}>
            <OgpImage image={ogpImage} alt={ogpTitle || ''} width={ImageSize} height={ImageSize} />
            <div className='flex w-full gap-2'>
                <div className='flex w-full flex-col'>
                    <div className="underline">{ogpTitle || url}</div>
                    <p className='line-clamp-2 text-sm'>{ogpDescription}</p>
                    <div className="mt-auto text-sm">
                        <BrowserTime timestamp={createdAt} />
                    </div>
                </div>
                <Button className='ml-auto flex items-center justify-center' variant={'ghost'} size='icon' onClick={(e) => {
                    window.open(url, '_blank', 'noopener,noreferrer');
                    e.preventDefault()
                    e.stopPropagation()
                }}>
                    <ExternalLinkIcon className="size-6" />
                </Button>
            </div>
        </Link>
    )
}

export default BookmarkListItem