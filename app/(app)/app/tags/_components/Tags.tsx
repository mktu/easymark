import { TagUsageType } from "@/lib/repositories/tag_usage"
import AdddTagForm from "./AddTagForm"
import { PinIcon } from "lucide-react"
import TagsTable from "./TagsTable"

type Props = {
    tags: TagUsageType[]
}

const Tags = ({ tags }: Props) => {
    return (
        <>
            <section className='flex w-full flex-col items-start gap-2'>
                <AdddTagForm />
            </section>
            <section className='flex w-full flex-col items-start gap-2'>
                <h3 className='flex items-center gap-2 text-lg font-semibold'>
                    <PinIcon className='size-4' />
                    Registed Tags
                </h3>
                <TagsTable tags={tags} />
            </section>
        </>
    )
}

export default Tags