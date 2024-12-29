import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";

const TopMessage: FC = () => {
    return (
        <div className='flex flex-col items-center gap-4 md:flex-row'>
            <div className='flex flex-col items-center gap-2'>
                <h1 className='text-3xl font-bold'>Easy mark</h1>
                <p className='text-xl font-semibold'>どこからでも簡単に、ブックマーク</p>
                <div className='mt-4 flex items-center gap-4'>
                    <Button asChild>
                        <Link href="/signup">Signup</Link>
                    </Button>
                    <Button variant='outline' asChild>
                        <Link href="/signin">Login</Link>
                    </Button>
                </div>
            </div>
            <div className='h-[200px] w-[350px] rounded border border-dotted md:h-[300px] md:w-[420px]'>
                img
            </div>
        </div>
    )
}

export default TopMessage