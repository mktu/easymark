import { TagType } from "@/lib/repositories/tags"
import AdddTagForm from "./AddTagForm"
import Tag from "./Tag"
import { handleDeleteTag } from "../_actions/handleDeleteTag"

type Props = {
    tags: TagType[]
}

const Tags = ({ tags }: Props) => {
    return (
        <div className='flex w-full justify-center'>
            <div className='flex w-full max-w-[750px] flex-col justify-start gap-4'>
                <h2 className='text-lg font-semibold'>Tags</h2>
                <p>タグを作成することで、ブックマークの検索を効率的に行うことができます</p>
                <section className='flex flex-col items-start gap-2'>
                    <AdddTagForm />
                </section>
                <section>
                    <h3 className='mb-2 font-semibold'>Registed Tags</h3>
                    {tags.length === 0 && <p>No Tags</p>}
                    <ul className="flex items-center gap-2">
                        {tags.map(tag => (
                            <Tag key={tag.tagId} tag={tag} />
                        ))}
                    </ul>
                </section>
            </div>

        </div>
    )
}

export default Tags