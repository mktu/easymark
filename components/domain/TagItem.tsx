import { FC } from "react"

type Props = {
    tag: { name: string, id: number }
}

const TagItem: FC<Props> = ({ tag }) => {
    return (
        <div className="flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-sm shadow">
            {tag.name}
        </div>
    )
}

export default TagItem