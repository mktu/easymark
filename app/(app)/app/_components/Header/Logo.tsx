import { cn } from '@/lib/utils'
import { Afacad } from 'next/font/google'


const afacad = Afacad({
    weight: '400',
    subsets: ['latin'],
})


const Logo: React.FC = () => {
    return (
        <div className={cn(afacad.className, 'text-3xl flex items-center gap-2')}>
            <h1>easy mark</h1>
        </div>
    )
}

export default Logo