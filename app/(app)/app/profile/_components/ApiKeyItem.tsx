import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { handleDeleteApiKey } from "../_actions/handleDeleteApiKey"
import { CopyIcon, Trash2Icon } from "lucide-react"
import { ApiKeyType } from "@/lib/repositories/api_key"
import Delete from "./Delete"
import { toast } from "sonner"

type Props = {
    apiKey: ApiKeyType
}

const ApiKeyItem = ({ apiKey }: Props) => {
    return (
        <div>
            <div className='flex items-center gap-2'>
                <div className='flex items-center gap-2'>
                    <div className='w-[160px] truncate'>
                        {apiKey.label}
                    </div>
                </div>
                <div className='flex flex-col gap-1 w-[300px]'>
                    <Input className='text-muted-foreground' id='apiKey' name='apiKey' defaultValue={apiKey.apiKey} readOnly />
                </div>
                <Button size='icon' variant='outline' onClick={() => {
                    navigator.clipboard.writeText(apiKey.apiKey)
                    toast.info('Copied to clipboard')
                }}>
                    <CopyIcon size={16} />
                </Button>
                <Delete onDelete={async () => {
                    await handleDeleteApiKey(apiKey.apiKey)
                }} />
                <div className='text-muted-foreground text-sm mt-1'>
                    {apiKey.expiresAt ? `Expired at: ${apiKey.expiresAt}` : 'No expiration'}
                </div>
            </div>
        </div >
    )
}

export default ApiKeyItem