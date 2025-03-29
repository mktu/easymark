'use client' // Error components must be Client Components

import { useEffect } from 'react'
import Image from "next/image";

export default function Error({
    error,
}: {
    error: Error & { digest?: string }
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className='flex min-h-screen w-full flex-col items-center gap-8 p-8'>
            <h2 className='flex items-center gap-2 text-lg font-semibold'>ブックマークを読み込めませんでした</h2>
            <Image src='/images/warning.svg' width={200} height={200} alt='error' />
        </div>
    )
}