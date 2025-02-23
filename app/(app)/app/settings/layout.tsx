import { SettingsIcon } from "lucide-react"
import { FC, ReactNode } from "react"

type Props = {
    children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
    return (
        <div className='flex size-full flex-col items-start justify-start gap-6 p-4'>
            <section className='flex flex-col gap-2'>
                <h2 className='flex items-center gap-2 text-lg font-semibold'>
                    <SettingsIcon className="size-5" />
                    Settings
                </h2>
                <p></p>
            </section>
            {children}
        </div>
    )
}

export default Layout