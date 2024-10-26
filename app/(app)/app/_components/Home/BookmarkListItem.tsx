import BrowserTime from "@/components/domain/BrowserTime"
import Link from "next/link"
import { FC } from "react"
import { BookmarkType } from "@/lib/repositories/bookmarks"
import OgpImage from "@/components/domain/OgpImage"
import { CategoryType } from "@/lib/repositories/categories"
import CategoryBox from "@/components/domain/CategoryBox"
import { BookmarkTagsType } from "@/lib/repositories/bookmark_tags"
import TagItem from "@/components/domain/TagItem"
import OpenLinkButton from "@/components/domain/OpenLinkButton"

type Props = {
    bookmark: BookmarkType,
    tags?: BookmarkTagsType[0],
    category?: CategoryType,
}

const ImageSize = 92

const BookmarkListItem: FC<Props> = ({
    bookmark,
    category,
    tags
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
                    <p className='line-clamp-2 text-sm'>{ogpDescription}</p>
                    <div className="mt-auto flex items-end gap-2 text-sm">
                        <span className="mr-2"><BrowserTime timestamp={createdAt} /></span>
                        {tags && tags.map(tag => (
                            <TagItem key={tag.id} tag={tag} />
                        ))}
                    </div>
                </div>
                <div className='ml-auto flex items-center'>
                    <OpenLinkButton url={url} />
                </div>
            </div>
        </Link>
    )
}

export default BookmarkListItem