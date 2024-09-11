import OgpImage from "@/components/domain/OgpImage"
import { Textarea } from "@/components/ui/textarea"
import { CircleAlertIcon } from "lucide-react"
import { FC } from "react"
import { Input } from "@/components/ui/input"
import { AddBookmarkState } from "../_actions/handleAddBookmark"
import { OgpResponse } from "@/lib/supabase/ogp"

type Props = {
    url: string,
    ogp: OgpResponse | null,
    setUrl: (url: string) => void,
    errors?: AddBookmarkState | null,
}
const ImageWitdth = 460
const ImageHeight = Math.floor(ImageWitdth / 1.91)

const OgpSection: FC<Props> = ({ url, ogp, setUrl, errors }) => {
    return (
        <section className='flex max-w-[500px] flex-col gap-4'>
            <div className='flex flex-col gap-2'>
                <label htmlFor="url">URL</label>
                <Input id='url' name='url' value={url} onChange={(e) => {
                    setUrl(e.target.value)
                }} />
                {errors && 'error' in errors && (
                    <p className='flex items-center text-destructive'>
                        <CircleAlertIcon className='mr-1 size-5' />
                        {errors.error}
                    </p>
                )}
            </div>
            {ogp ? (
                <>
                    <div className='flex justify-center gap-4'>
                        <OgpImage url={url} image={ogp.image?.url} alt={ogp.title || url} width={ImageWitdth} height={ImageHeight} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="title">Title</label>
                        <Input id='title' name='title' value={ogp.title || url} disabled />
                        <label htmlFor="description">Description</label>
                        <Textarea id='description' name='description' value={ogp.description} disabled />
                    </div>
                </>
            ) : (
                <p>URLを入力すると自動取得されます（サイトによっては取得できない場合があります）</p>
            )}
        </section>
    )
}

export default OgpSection