import { ViewportType } from '@/contexts/viewport'
import ViewportProvider from './ViewportProvider'
import { FC, ReactNode } from 'react'

type Props = {
    children: ReactNode,
    viewport: ViewportType
}

const Provider: FC<Props> = ({ children, viewport }) => {
    return (
        <ViewportProvider viewport={viewport}>
            {children}
        </ViewportProvider>
    )
}

export default Provider 