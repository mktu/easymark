'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FC } from "react";
import { useFormState } from "react-dom";
import { AddBookmarkState, handleBookmarkSubmit } from "../../_actions/handleAddBookmark";
import { useBookmarkInput } from "../../hooks/useBookmarkInput";
import Image from "next/image";
import OgpImage from "@/components/domain/OgpImage";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
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
    const { ogp, setBookmark, bookmark, validBookmark } = useBookmarkInput()
    const handleAddBookmarkWithOgp = handleBookmarkSubmit.bind(null, ogp || null)
    const [state, dispatch] = useFormState<AddBookmarkState, FormData>(handleAddBookmarkWithOgp, { error: null })
    return (
        <section className="flex flex-col gap-2">
            <div className='flex w-full flex-col items-center gap-4 p-4'>
                <h2 className='flex items-center text-lg font-semibold'>
                    Welcome {user.username}&apos;s Home. Les&apos;s add first bookmark !
                </h2>
                <Image src='/images/welcome.svg' width={200} height={200} alt='welcome' />
            </div>
            <form className='flex w-full flex-col items-center gap-4 p-4' action={dispatch}>
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

                {'error' in state && <ErrorIndicator error={state.error || ''} />}
                {'validatedErrors' in state && <ErrorIndicator error={state.validatedErrors.url} />}
            </form>
        </section>
    )
}

export default Welcome;