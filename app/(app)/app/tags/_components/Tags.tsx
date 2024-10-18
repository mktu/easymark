import { TagUsageType } from "@/lib/repositories/tag_usage"
import AdddTagForm from "./AddTagForm"
import Tag from "./Tag"
import { PinIcon, TagIcon } from "lucide-react"

type Props = {
    tags: TagUsageType[]
}

const Tags = ({ tags }: Props) => {
    return (
        <div className='flex size-full flex-col items-start justify-start gap-6 p-4'>
            <section className='flex flex-col gap-2'>
                <h2 className='flex items-center gap-2 text-lg font-semibold'>
                    <TagIcon className="size-5" />
                    Tags
                </h2>
                <p>タグを作成することで、ブックマークの検索を効率的に行うことができます</p>
            </section>
            <section className='flex flex-col items-start gap-2'>
                <AdddTagForm />
            </section>
            <section className='flex flex-col items-start gap-2'>
                <h3 className='flex items-center gap-2 text-lg font-semibold'>
                    <PinIcon className='size-4' />
                    Registed Tags
                </h3>
                {tags.length === 0 && <p>No Tags</p>}
                <ul className="flex w-full flex-wrap items-center gap-2 p-4">
                    {tags.map(tag => (
                        <Tag key={tag.tagId} tag={tag} />
                    ))}
                </ul>
            </section>

        </div>
    )
}

export default Tags