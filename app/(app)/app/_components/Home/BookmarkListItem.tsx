import BrowserTime from "@/components/domain/BrowserTime"
import Link from "next/link"
import { FC } from "react"
import { BookmarkType } from "@/lib/repositories/bookmarks"
import OgpImage from "@/components/domain/OgpImage"
import { CategoryType } from "@/lib/repositories/categories"
import BookmarkLink from "./BookmarkLink"

type Props = {
    bookmark: BookmarkType,
    category?: CategoryType,
}

const ImageSize = 48

const BookmarkListItem: FC<Props> = ({
    bookmark,
    category,
}) => {
    const { bookmarkId, ogpImage, ogpTitle, url, createdAt, ogpDescription } = bookmark
    return (
        <Link href={`/app/bookmarks/${bookmarkId}`}
            style={{ borderLeftColor: category?.color || 'transparent' }}
            className='relative flex w-full gap-2 border-l-4 p-2 shadow'>
            <OgpImage image={ogpImage} alt={ogpTitle || ''} width={ImageSize} height={ImageSize} />
            <div className='flex w-full items-start gap-2'>
                <div className='flex size-full flex-col'>
                    <div className="underline">{ogpTitle || url}</div>
                    <p className='mt-auto line-clamp-2 text-xs'>{ogpDescription}</p>
                </div>
                <div className='ml-auto flex h-full items-center'>
                    <div className="mt-auto flex items-end gap-2 text-sm">
                        <span className="mr-2"><BrowserTime timestamp={createdAt} /></span>
                    </div>
                    <BookmarkLink url={url} bookmarkId={bookmarkId} />
                </div>
            </div>
        </Link>
    )
}

export default BookmarkListItem