import BrowserTime from "@/components/domain/BrowserTime"
import Link from "next/link"
import { FC } from "react"
import { BookmarkType } from "@/lib/repositories/bookmarks"
import OgpImage from "@/components/domain/OgpImage"
import OpenLinkButton from "./OpenLinkButton"

type Props = {
    bookmark: BookmarkType
}

const ImageSize = 92

const BookmarkListItem: FC<Props> = ({
    bookmark
}) => {
    const { bookmarkId, ogpImage, ogpTitle, url, createdAt, ogpDescription } = bookmark
    return (
        <Link href={`/app/bookmarks/${bookmarkId}`} className='flex w-full gap-2 rounded border p-2'>
            <OgpImage image={ogpImage} alt={ogpTitle || ''} width={ImageSize} height={ImageSize} />
            <div className='flex w-full gap-2'>
                <div className='flex w-full flex-col'>
                    <div className="underline">{ogpTitle || url}</div>
                    <p className='line-clamp-2 text-sm'>{ogpDescription}</p>
                    <div className="mt-auto text-sm">
                        <BrowserTime timestamp={createdAt} />
                    </div>
                </div>
                <OpenLinkButton url={url} />
            </div>
        </Link>
    )
}

export default BookmarkListItem