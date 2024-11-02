import { FC, MouseEventHandler } from "react"

type Props = {
    tag: { name: string, id: number },
    onClick?: MouseEventHandler<HTMLButtonElement>
}

const TagItem: FC<Props> = ({ tag, onClick }) => {
    return (
        <button onClick={onClick} className="flex items-center justify-center border border-input rounded-lg text-muted-foreground px-2 py-0.5 text-sm shadow-sm">
            # {tag.name}
        </button>
    )
}

export default TagItem