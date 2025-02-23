import { FC, ReactNode } from "react"

type Props = {
    children: ReactNode
}

const CenterizedLayout: FC<Props> = ({
    children
}) => {
    return (
        <div className="flex size-full flex-col items-center justify-center gap-2 p-4 md:h-screen">
            {children}
        </div>
    )
}

export default CenterizedLayout