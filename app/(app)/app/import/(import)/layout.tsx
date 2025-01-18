import { ImportIcon } from "lucide-react"
import { FC } from "react"
import Procedure from "./_component/Procedure"

type Props = {
    children: React.ReactNode
}

const Layout: FC<Props> = ({ children }) => {
    return (
        <section className='flex size-full flex-col items-start justify-start gap-2 p-4'>
            <h2 className='flex items-center gap-2 text-lg font-semibold'>
                <ImportIcon className='size-5' />Import Bookmarks
            </h2>
            <p className='flex items-center gap-1 text-sm'>ブラウザからエクスポートしたブックマーク(.html)をインポートしてみましょう
                <Procedure />
            </p>
            <p className='ml-2 flex items-center gap-1 text-sm'>※インポートしたブックマークは&quot;Imported&ldquo;カテゴリに登録されます</p>
            {children}
        </section>
    )
}

export default Layout