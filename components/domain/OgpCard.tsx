import { FC } from "react"
import NoImage from "../svg/NoImage"
import OgpImage from "./OgpImage"

type Props = {
    title: string,
    url: string,
    image?: string | null,
    description?: string | null,
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
        <article className="flex gap-2 overflow-hidden rounded border border-gray-50 transition-shadow hover:shadow-sm">
            <OgpImage image={image} alt={title} width={width} height={height} />
            <div >
                <h2>
                    <a href={url} target='_blank' rel='noopener noreferrer' className="underline">
                        {title}
                    </a>
                </h2>
                <p>{description}</p>
            </div>
        </article>)
}

export default OgpCard