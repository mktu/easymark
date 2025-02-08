import { TagIcon } from "lucide-react"
import { FC, ReactNode } from "react"

type Props = {
    children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
    return (
        <div className='flex size-full flex-col items-start justify-start gap-6 p-4'>
            <section className='flex flex-col gap-2'>
                <h2 className='flex items-center gap-2 text-lg font-semibold'>
                    <TagIcon className="size-5" />
                    Tags
                </h2>
                <p>タグを作成することで、ブックマークの検索を効率的に行うことができます</p>
            </section>
            {children}
        </div>
    )
}

export default Layout