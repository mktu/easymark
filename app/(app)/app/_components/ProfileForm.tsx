'use client'
import { handleRegister, ProfileState } from '@/app/(profile)/_actions/actionHandler'
import ValidationErrors from '@/app/(profile)/_components/ValidationErrors'
import { Database } from '@/lib/supabase/schema'
import { useFormState, useFormStatus } from 'react-dom'
type Props = {
    user: Database['public']['Tables']['users']['Row']
}

const ProfileForm: React.FC<Props> = ({ user }) => {
    const [state, dispatch] = useFormState<ProfileState, FormData>(handleRegister, {})
    const { pending } = useFormStatus()
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <form action={dispatch}>
                <label htmlFor="name">Name</label>
                <input id='name' name='name' defaultValue={user.username || ''} />
                <button type="submit">Submit</button>
            </form>
            {pending && <div>saving...</div>}
            <ValidationErrors state={state} />
            {'success' in state && <div>Success</div>}
        </div>
    )
}

export default ProfileForm