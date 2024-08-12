'use client'
import BrowserTime from "@/components/domain/BrowserTime"
import NoImage from "@/components/svg/NoImage"
import { Button } from "@/components/ui/button"
import { EditIcon } from "lucide-react"
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
        <div className='flex w-full gap-2 rounded border p-2'>
            <OgpImage image={ogpImage} alt={ogpTitle || ''} width={ImageSize} height={ImageSize} />
            <div className='flex w-full gap-2'>
                <div className='flex w-full flex-col'>
                    <a href={url} target='_blank' rel='noopener noreferrer' className="underline">{ogpTitle || url}</a>
                    <p className='line-clamp-2 text-sm'>{ogpDescription}</p>
                    <div className="mt-auto text-sm">
                        <BrowserTime timestamp={createdAt} />
                    </div>
                </div>
                <Link className='ml-auto md:hidden' href={`/app/bookmarks/${bookmarkId}`}>
                    <EditIcon className="size-6" />
                </Link>
                <Button className='ml-auto hidden md:block' variant={'ghost'} size='icon' onClick={() => {
                    open(bookmark)
                }}>
                    <EditIcon className="size-6" />
                </Button>
            </div>
        </div>
    )
}

export default BookmarkListItem