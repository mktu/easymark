import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { ApiKeyType } from "@/lib/repositories/api_key"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { toast } from "sonner"
import Delete from "./Delete"
import { handleDeleteApiKey } from "../_actions/handleDeleteApiKey"
import { useState } from "react"
import BrowserTime from "@/components/domain/BrowserTime"

type Props = {
    apiKey: ApiKeyType
}

const ApiKeyTableItem = ({ apiKey }: Props) => {
    const [showApiKey, setShowApiKey] = useState(false)
    return (
        <TableRow key={apiKey.apiKey}>
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
                <Delete onDelete={async () => {
                    await handleDeleteApiKey(apiKey.apiKey)
                }} />
            </TableCell>
        </TableRow >
    )
}

export default ApiKeyTableItem;