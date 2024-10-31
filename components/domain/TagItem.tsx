import { FC } from "react"

type Props = {
    tag: { name: string, id: number }
}

const TagItem: FC<Props> = ({ tag }) => {
    return (
        <div className="flex items-center justify-center border border-input rounded-lg text-muted-foreground px-2 py-0.5 text-sm shadow-sm">
            # {tag.name}
        </div>
    )
}

export default TagItem