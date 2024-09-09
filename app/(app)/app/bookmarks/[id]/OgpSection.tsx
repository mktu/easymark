import CopyableItem from "@/components/domain/CopyableItem"
import OgpImage from "@/components/domain/OgpImage"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RefreshCwIcon } from "lucide-react"
import { FC } from "react"
import { Input } from "@/components/ui/input"

type Props = {
    url: string,
    title?: string,
    description?: string,
    image?: string,
    onUpdateOgp: () => void
}
const ImageWitdth = 460
const ImageHeight = Math.floor(ImageWitdth / 1.91)

const OgpSection: FC<Props> = ({ url, title, description, image, onUpdateOgp }) => {
    return (
        <section className='flex max-w-[700px] flex-col gap-2'>
            <div className='flex justify-center gap-4'>
                <OgpImage url={url} image={image} alt={title || url} width={ImageWitdth} height={ImageHeight} />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="url">URL</label>
                <CopyableItem id='url' content={url} />
                <label htmlFor="title">Title</label>
                <Input id='title' name='title' value={title || url} disabled />
                <label htmlFor="description">Description</label>
                <Textarea id='description' name='description' value={description} disabled />
                <div className='mt-4'>
                    <p>
                        情報が正しく取得されていない場合、以下のボタンで更新してください。
                    </p>
                    <div className='flex'>
                        <Button className='ml-auto w-fit' variant='ghost' type='button' onClick={onUpdateOgp}>
                            <RefreshCwIcon className='mr-1 size-5' />
                            Update OGP Info
                        </Button>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default OgpSection