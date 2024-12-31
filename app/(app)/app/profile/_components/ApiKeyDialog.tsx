import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FC, useMemo, useState } from "react";
import { calculateExpiryDate, expiryOptions } from "../_utils/apiKeyExpiredAt";
import { generateApiKey } from "../_utils/generateApiKey";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";
import { handleAddApikey, HandleAddApikeyType } from "@/actions/apikey/handleAddApiKey";
import ErrorIndicator from "../../_components/ErrorIndicator/ErrorIndicator";

type Props = {
    onClose: () => void,
}

const ApiKeyDialog: FC<Props> = ({
    onClose,
}) => {
    const [expiredAt, setExpiredAt] = useState<string | null>(null)
    const [label, setLabel] = useState('')
    const apiKey = useMemo(() => generateApiKey(16), [])
    const [apiKeyResult, setApiKeyResult] = useState<HandleAddApikeyType>()
    return (
        <Dialog
            modal
            open
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    onClose()
                }
            }}
        >
            <DialogContent>
                <form action={async () => {
                    const result = await handleAddApikey({ apiKey, label, expiredAt });
                    setApiKeyResult(result)
                    if (result?.success) {
                        onClose()
                    }
                }} className='flex flex-col gap-2'>
                    <DialogTitle>APIキーを生成</DialogTitle>
                    <DialogDescription>API Key is used to access the API.</DialogDescription>
                    <ErrorIndicator error={apiKeyResult?.error} />
                    <div className='flex flex-col gap-2 p-2'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="apiKey">API Key</label>
                            <div className="flex w-full items-center gap-2">
                                <Input className="text-muted-foreground" id='apiKey' name='apiKey' defaultValue={apiKey} readOnly />
                                <Button type='button' variant='outline' size='icon' onClick={() => {
                                    toast.info('Copied to clipboard')
                                    navigator.clipboard.writeText(apiKey)
                                }}>
                                    <CopyIcon size={16} />
                                </Button>
                            </div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="label">Label</label>
                            <div className="flex w-full items-center gap-2">
                                <Input id='label' name='label' value={label} onChange={(e) => {
                                    setLabel(e.target.value)
                                }} />
                            </div>
                            <ErrorIndicator error={apiKeyResult?.validatedErrors?.label} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="expiredAt">有効期限</label>
                            <Select defaultValue="none" onValueChange={(value) => {
                                setExpiredAt(calculateExpiryDate(value))
                            }}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="有効期限を選択" />
                                </SelectTrigger>
                                <SelectContent>
                                    {expiryOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter className='mt-2 gap-2'>
                        <Button variant='outline' onClick={onClose}>Cancel</Button>
                        <Button>Generate</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default ApiKeyDialog