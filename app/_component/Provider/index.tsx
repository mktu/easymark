import { ViewportType } from '@/contexts/viewport'
import ViewportProvider from './ViewportProvider'

type Props = {
    children: React.ReactNode,
    viewport: ViewportType
}

const Provider: React.FC<Props> = ({ children, viewport }) => {
    return (
        <ViewportProvider viewport={viewport}>
            {children}
        </ViewportProvider>
    )
}

export default Provider 