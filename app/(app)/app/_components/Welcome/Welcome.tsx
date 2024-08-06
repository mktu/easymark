'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { validateURL } from "../../_lib/validateUrl";
import { OgpResponse } from "@/app/api/ogp/route";
import { useFormState } from "react-dom";
import { AddBookmarkState, handleBookmarkSubmit } from "../../_actions/handleAddBookmark";
import OgpCard from "@/components/domain/OgpCard";
import { useBookmarkInput } from "../../hooks/useBookmarkInput";

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
        <form className='w-full' action={dispatch}>
            <div> Welcome {user.username} !<br /> Lets add first bookmark</div>
            <div className='flex items-center gap-1'>
                <Input value={bookmark} onChange={(e) => {
                    setBookmark(e.target.value)
                }} id='url' name='url' />
                <Button disabled={!validBookmark}>Add</Button>
            </div>

            {ogp && (
                <OgpCard
                    url={ogp.url}
                    title={ogp.title}
                    description={ogp.description}
                    image={ogp.image?.url}
                    height={200}
                    width={200}
                />
            )}

            {'error' in state && <div>{state.error}</div>}
            {'validatedErrors' in state && <div>{state.validatedErrors.url}</div>}
        </form>
    )
}

export default Welcome;