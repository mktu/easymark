'use client'

import OpenLinkButton from "@/components/domain/OpenLinkButton"
import { handleVisitBookmark } from "../../_actions/handleVisitBookmark"

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
