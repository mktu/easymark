import { ImportIcon } from "lucide-react"
import { FC, ReactNode } from "react"

type Props = {
    children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
    return (
        <section className='flex size-full flex-col items-start justify-start gap-2 p-4'>
            <h2 className='flex items-center gap-2 text-lg font-semibold'>
                <ImportIcon className='size-5' />Importing Status
            </h2>
            {children}
        </section>
    )
}

export default Layout