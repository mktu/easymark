'use client'
import { Button } from '@/components/ui/button'
import { ApiKeyType } from '@/lib/repositories/api_key'
import { FC, useState } from 'react'
import ApiKeyDialog from '../../settings/_components/ApiKeyDialog'
import ApiKeyTable from '../../settings/_components/ApiKeyTable'
type Props = {
    apiKeys: ApiKeyType[]
}

const SettingForm: FC<Props> = ({ apiKeys }) => {
    const [open, setOpen] = useState(false)
    return (
        <section className="flex h-full flex-col gap-2 p-4">
            <div className='flex w-full flex-col gap-4 p-2'>
                <div className='flex flex-col gap-2'>
                    <h3 className='font-semibold'>API Keys</h3>
                    <div className='flex flex-col gap-2'>
                        <ApiKeyTable apiKeys={apiKeys} />
                    </div>
                    <div className='mt-2'>
                        <Button className='ml-auto' variant='outline' type='button' onClick={() => {
                            setOpen(true)
                        }}>Generate API Key</Button>
                    </div>
                    {open && (
                        <ApiKeyDialog
                            onClose={() => {
                                setOpen(false)
                            }}
                        />
                    )}
                </div>
            </div>
        </section>
    )
}

export default SettingForm