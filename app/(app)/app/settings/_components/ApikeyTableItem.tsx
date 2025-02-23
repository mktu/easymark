import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { ApiKeyType } from "@/lib/repositories/api_key"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { toast } from "sonner"
import { handleDeleteApiKey } from "@/actions/apikey/handleDeleteApiKey"
import { useState } from "react"
import BrowserTime from "@/components/domain/BrowserTime"
import DeleteWithPopup from "@/components/domain/DeleteWithPopup"

type Props = {
    apiKey: ApiKeyType
}

const ApiKeyTableItem = ({ apiKey }: Props) => {
    const [showApiKey, setShowApiKey] = useState(false)
    return (
        <TableRow>
            <TableCell>{apiKey.label}</TableCell>
            <TableCell className="flex items-center gap-2">
                {showApiKey ? (
                    <>
                        <Button variant='ghost' size='icon' onClick={() => {
                            setShowApiKey(false)
                        }}>
                            <EyeOffIcon size={16} />
                        </Button>
                        <Button variant='ghost' onClick={() => {
                            toast.info('Copied to clipboard')
                            navigator.clipboard.writeText(apiKey.apiKey)
                        }}>
                            <code className="text-xs">{apiKey.apiKey}</code>
                        </Button>
                    </>
                ) : (
                    <>
                        <Button variant='ghost' size='icon' onClick={() => {
                            setShowApiKey(true)
                        }}>
                            <EyeIcon size={16} />
                        </Button>
                        <code className="text-xs">••••••••••••••••••••••</code>
                    </>
                )
                }
            </TableCell >
            <TableCell>{apiKey.expiresAt ?
                <BrowserTime timestamp={apiKey.expiresAt} dateOnly />
                : 'No expiration'}</TableCell>
            <TableCell className="text-right">
                <DeleteWithPopup
                    message='Are you sure you want to delete this api key?'
                    onDelete={async () => {
                        await handleDeleteApiKey(apiKey.apiKey)
                    }} />
            </TableCell>
        </TableRow >
    )
}

export default ApiKeyTableItem;