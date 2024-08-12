import { FC } from "react"
import NoImage from "../svg/NoImage"

type Props = {
    image?: string | null,
    alt: string,
    width?: number,
    height?: number
}

const OgpImage: FC<Props> = ({
    image,
    alt,
    width = 200,
    height = 200
}) => {
    return image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={alt} width={width} height={height} className='rounded border border-input object-cover' style={{
            width, height
        }} />
    ) : (
        <NoImage width={width} height={height} />
    )
}

export default OgpImage