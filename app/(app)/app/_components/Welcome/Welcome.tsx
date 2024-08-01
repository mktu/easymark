'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { validateURL } from "../../_lib/validateUrl";
import { OgpResponse } from "@/app/api/ogp/route";
import NoImage from "@/components/svg/NoImage";
import { useFormState } from "react-dom";
import { AddBookmarkState, handleAddBookmark } from "../../_actions/handleAddBookmark";

type Props = {
    user: {
        username: string
    }
}

const Welcome: FC<Props> = ({
    user
}) => {
    const [state, dispatch] = useFormState<AddBookmarkState, FormData>(handleAddBookmark, { error: null })
    const [bookmark, setBookmark] = useState('')
    const [ogp, setOgp] = useState<OgpResponse | null>(null)
    const validBookmark = useMemo(() => validateURL(bookmark), [bookmark])
    const fetchOgp = useCallback(async () => {
        const params = new URLSearchParams({ url: bookmark });
        const res = await fetch('/api/ogp?' + params.toString());
        return await res.json() as OgpResponse;
    }, [bookmark])
    // const getOgp = useCallback((async (url: string) => {
    //     const params = new URLSearchParams({ url });
    //     const res = await fetch('/api/ogp?' + params.toString());
    //     return await res.json() as OgpResponse;
    // }), [])
    // const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    //     const inputValue = e.target.value
    //     setBookmark(inputValue)
    //     startTransition(() => {
    //         if (validateURL(inputValue)) {
    //             getOgp(inputValue).then(setOgp)
    //         }
    //     })
    // };
    useEffect(() => {
        let canGo = true
        validBookmark && fetchOgp().then((ogp) => {
            if (canGo) {
                setOgp(ogp)
            }
        })
        return () => {
            canGo = false
        }
    }, [fetchOgp, validBookmark])
    return (
        <form className='w-full' action={dispatch}>
            <div> Welcome {user.username} !<br /> Lets add first bookmark</div>
            <div className='flex items-center gap-1'>
                <Input value={bookmark} onChange={(e) => {
                    setBookmark(e.target.value)
                }} id='url' name='url' />
                <Button disabled={!validBookmark}>Add</Button>
            </div>

            {ogp && (
                <div className='flex items-center gap-2'>
                    {ogp.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={ogp.image.url} width={200} height={200} alt={ogp.title || bookmark} />
                    ) : <NoImage width={200} height={200} />}
                    <div>
                        <div>{ogp.title}</div>
                        <div>{ogp.description}</div>
                    </div>
                </div>
            )}

            {'error' in state && <div>{state.error}</div>}
            {'validatedErrors' in state && <div>{state.validatedErrors.url}</div>}
        </form>
    )
}

export default Welcome;