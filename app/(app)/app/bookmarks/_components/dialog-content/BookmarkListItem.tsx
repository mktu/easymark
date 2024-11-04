import BrowserTime from "@/components/domain/BrowserTime";
import OgpImage from "@/components/domain/OgpImage";
import OpenLinkButton from "@/components/domain/OpenLinkButton";
import { BookmarkType } from "@/lib/repositories/bookmarks";
import { handleVisitBookmark } from "../../../_actions/handleVisitBookmark";
import Link from "next/link";

type Props = {
    bookmark: BookmarkType,
}

const ImageSize = 64

const BookmarkListItem = ({ bookmark }: Props) => {
    return (
        <li className="flex w-full items-center gap-2">
            <OgpImage image={bookmark.ogpImage} alt={bookmark.ogpTitle || ''} width={ImageSize} height={ImageSize} />
            <Link href={`/app/bookmarks/${bookmark.bookmarkId}`} className='flex w-full items-start gap-2'>
                <div className='flex size-full flex-col'>
                    <div className="text-sm underline">{bookmark.ogpTitle || bookmark.url}</div>
                    <div className="mt-auto flex w-full items-end gap-2 text-xs">
                        <span className="mr-2"><BrowserTime timestamp={bookmark.createdAt} /></span>
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