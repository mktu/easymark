'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FC } from "react";
import { useBookmarkInput } from "@/hooks/bookmarks/new/useBookmarkInput";
import Image from "next/image";
import OgpImage from "@/components/domain/OgpImage";
import ErrorIndicator from "../../../_components/ErrorIndicator/ErrorIndicator";
import Placeholder from "./Placeholder";


const ImageWitdth = 420
const ImageHeight = Math.floor(ImageWitdth / 1.91)

type Props = {
    user: {
        username: string
    }
}

const Welcome: FC<Props> = ({
    user
}) => {
    const { ogp, setBookmark, bookmark, validBookmark, handleSubmit, addBookmarkResult } = useBookmarkInput()
    return (
        <section className="flex flex-col gap-2">
            <div className='flex w-full flex-col items-center gap-4 p-4'>
                <h2 className='flex items-center text-lg font-semibold'>
                    Welcome {user.username}&apos;s Home. Les&apos;s add first bookmark !
                </h2>
                <Image src='/images/welcome.svg' width={200} height={200} alt='welcome' />
            </div>
            <form className='flex w-full flex-col items-center gap-4 p-4' action={() => {
                handleSubmit()
            }}>
                <div className='flex w-full items-center gap-1 md:w-[600px]'>
                    <Input value={bookmark} onChange={(e) => {
                        setBookmark(e.target.value)
                    }} id='url' name='url' />
                    <Button disabled={!validBookmark}>Add</Button>
                </div>
                {ogp ? (
                    <div className="flex w-full flex-col items-center gap-2 md:w-[600px]">
                        <OgpImage
                            url={bookmark}
                            image={ogp?.image?.url}
                            alt={ogp?.title}
                            width={ImageWitdth}
                            height={ImageHeight} />
                        <h3 className='font-semibold'>{ogp?.title}</h3>
                        <p className="flex w-full justify-center text-sm text-muted-foreground md:w-[450px]">{ogp?.description}</p>
                    </div>
                ) : <Placeholder />}
                <ErrorIndicator error={addBookmarkResult?.error} />
                <ErrorIndicator error={addBookmarkResult?.validatedErrors?.url} />
            </form>
        </section>
    )
}

export default Welcome;