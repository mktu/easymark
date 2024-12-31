'use client'

import OpenLinkButton from "@/components/domain/OpenLinkButton"
import { handleVisitBookmark } from "@/actions/bookmarks/handleVisitBookmark"

type Props = {
    url: string
    bookmarkId: number
}

const BookmarkLink = ({ url, bookmarkId }: Props) => {
    return <OpenLinkButton url={url} onClick={() => {
        handleVisitBookmark(bookmarkId)
    }} />
}

export default BookmarkLink
