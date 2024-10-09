import BrowserTime from "@/components/domain/BrowserTime"
import Link from "next/link"
import { FC } from "react"
import { BookmarkType } from "@/lib/repositories/bookmarks"
import OgpImage from "@/components/domain/OgpImage"
import OpenLinkButton from "./OpenLinkButton"
import { CategoryType } from "@/lib/repositories/categories"
import CategoryBox from "@/components/domain/CategoryBox"
import { BookmarkTagsType } from "@/lib/repositories/bookmark_tags"
import TagItem from "./TagItem"

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
        <Link href={`/app/bookmarks/${bookmarkId}`} className='flex w-full gap-2 rounded border p-2'>
            <OgpImage image={ogpImage} alt={ogpTitle || ''} width={ImageSize} height={ImageSize} />
            <div className='flex w-full items-start gap-2'>
                <div className='flex size-full flex-col'>
                    <div className="underline">{ogpTitle || url}</div>
                    <p className='line-clamp-2 text-sm'>{ogpDescription}</p>
                    <div className="mt-auto text-sm flex items-end gap-2">
                        <span className="mr-2"><BrowserTime timestamp={createdAt} /></span>
                        {tags && tags.map(tag => (
                            <TagItem key={tag.id} tag={tag} />
                        ))}
                    </div>
                </div>
                <div className='ml-auto flex items-center'>
                    <CategoryBox color={category?.color} size='sm' />
                    <OpenLinkButton url={url} />
                </div>
            </div>
        </Link>
    )
}

export default BookmarkListItem