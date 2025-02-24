import CenterizedLayout from "@/app/_component/Layout/CenterizedLayout"
import { LogInIcon } from "lucide-react"
import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <CenterizedLayout>
            <section className='flex w-full flex-col items-center justify-center gap-2 p-4 md:w-[320px]'>
                <h2 className='mb-4 flex items-center gap-2 text-lg font-semibold'>
                    <LogInIcon className='size-5' />Signin to Easymark
                </h2>
                {children}
            </section>
        </CenterizedLayout>
    )
}

export default Layout