import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";

const TopMessage: FC = () => {
    return (
        <div className='flex flex-col md:flex-row items-center gap-4'>
            <div className='flex flex-col gap-2 items-center'>
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
            <div className='w-[350px] md:w-[420px] h-[200px] md:h-[300px] border border-dotted rounded'>
                img
            </div>
        </div>
    )
}

export default TopMessage