import BrowserTime from "@/components/domain/BrowserTime"
import NoImage from "@/components/svg/NoImage"
import { FC } from "react"

type Props = {
    title: string,
    url: string,
    image: string | null,
    createdAt: string
}

const ImageSize = 48

const BookmarkListItem: FC<Props> = ({
    title,
    url,
    image,
    createdAt
}) => {
    return (
        <a href={url} target='_blank' rel='noopener noreferrer' className='flex w-full gap-2'>
            {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image} alt={title} width={ImageSize} height={ImageSize} />
            ) : (
                <NoImage className="rounded" width={ImageSize} height={ImageSize} />
            )}
            <div className='flex flex-col'>
                <div>{title}</div>
                <div className="mt-auto">
                    <BrowserTime timestamp={createdAt} />
                </div>
            </div>
        </a>
    )
}

export default BookmarkListItem