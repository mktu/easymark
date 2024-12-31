'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ApiKeyType } from '@/lib/repositories/api_key'
import { UserType } from '@/lib/repositories/profile'
import { useState } from 'react'
import ApiKeyDialog from './ApiKeyDialog'
import { handleUpdateProfile, HandleUpdateProfileType } from '@/actions/profile/handleUpdateProfile'
import ErrorIndicator from '../../_components/ErrorIndicator/ErrorIndicator'
import { toast } from 'sonner'
import { User2 } from 'lucide-react'
import ApiKeyTable from './ApiKeyTable'
type Props = {
    user: UserType,
    apiKeys: ApiKeyType[]
}

const ProfileForm: React.FC<Props> = ({ user, apiKeys }) => {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState(user.username || '')
    const [updateResult, setUpdateResult] = useState<HandleUpdateProfileType>()
    return (
        <section className="flex h-full flex-col gap-2 p-4">
            <h2 className='flex items-center gap-2 text-lg font-semibold'>
                <User2 className='size-5' />User Settings</h2>
            <div className='flex w-full flex-col gap-4 p-2'>
                <div className='flex flex-col gap-2'>
                    <h3 className='font-semibold'>Profile</h3>
                    <form action={async () => {
                        const result = await handleUpdateProfile({ name, image: null })
                        setUpdateResult(result)
                        if (result?.success) {
                            toast.success('Profile updated')
                        }
                    }} className='flex w-full items-end gap-2'>
                        <div className='flex w-full flex-col gap-1 md:w-[250px]
                '>
                            <Input id='name' name='name' value={name} onChange={(e) => {
                                setName(e.target.value)
                            }} />
                        </div>
                        <Button className='whitespace-nowrap' type="submit">Update</Button>
                    </form>
                    <ErrorIndicator error={updateResult?.validatedErrors?.name} />
                </div>
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

export default ProfileForm