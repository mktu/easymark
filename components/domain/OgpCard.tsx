import { FC } from "react"
import NoImage from "../svg/NoImage"

type Props = {
    title: string,
    url: string,
    image?: string,
    description?: string,
    width?: number,
    height?: number
}

const OgpCard: FC<Props> = ({
    title,
    url,
    image,
    description,
    width = 200,
    height = 200
}) => {
    return (
        <article className="overflow-hidden rounded border border-gray-50 transition-shadow hover:shadow-sm">
            <a href={url} target='_blank' rel='noopener noreferrer' className='flex gap-2'>
                {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={image} alt={title} width={width} height={height} />
                ) : (
                    <NoImage width={width} height={height} />
                )}
                <div >
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
            </a>
        </article>)
}

export default OgpCard