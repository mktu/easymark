import BrowserTime from "@/components/domain/BrowserTime";
import OgpImage from "@/components/domain/OgpImage";
import OpenLinkButton from "@/components/domain/OpenLinkButton";
import { SearchBookmarkType } from "@/lib/repositories/bookmarks";
import { handleVisitBookmark } from "../../../_actions/handleVisitBookmark";
import Link from "next/link";

type Props = {
    bookmark: SearchBookmarkType,
    onSelectTag: (tag: string) => void
}

const ImageSize = 64

const BookmarkListItem = ({ bookmark, onSelectTag }: Props) => {
    return (
        <li className="flex w-full items-center gap-2">
            <OgpImage image={bookmark.ogpImage} alt={bookmark.ogpTitle || ''} width={ImageSize} height={ImageSize} />
            <Link href={`/app/bookmarks/${bookmark.bookmarkId}`} className='flex w-full flex-1 items-start gap-2 overflow-x-hidden'>
                <div className='flex w-full flex-col overflow-x-hidden'>
                    <div className="w-full truncate text-sm underline">{bookmark.ogpTitle || bookmark.url}</div>
                    <div className='line-clamp-2 text-xs'>{bookmark.ogpDescription}</div>
                    <div className="mt-auto flex w-full items-end gap-2 text-xs">
                        <span className="mr-2"><BrowserTime timestamp={bookmark.createdAt} /></span>
                        {bookmark.tagNames && bookmark.tagNames.map(tag => (
                            <button className='underline' key={tag}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    e.preventDefault()
                                    onSelectTag(tag)
                                }}
                            ># {tag}</button>
                        ))}
                    </div>
                </div>
                <div className="ml-auto flex h-full flex-col items-end">
                    <div className='flex items-center'>
                        <OpenLinkButton url={bookmark.url} onClick={() => {
                            handleVisitBookmark(bookmark.bookmarkId)
                        }} />
                    </div>
                </div>

            </Link>
        </li>
    )
}

export default BookmarkListItem;