import { LogInIcon } from "lucide-react"
import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <section className='flex size-full flex-col items-start justify-start gap-2 p-4'>
            <h2 className='flex items-center gap-2 text-lg font-semibold'>
                <LogInIcon className='size-5' />Signin
            </h2>
            {children}
        </section>
    )
}

export default Layout