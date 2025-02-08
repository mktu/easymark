'use client'
import { FC, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { handleRegisterProfile, HandleRegisterProfileReturnType } from "@/actions/profile/handleRegisterProfile";
import { Input } from "@/components/ui/input";
import ErrorIndicator from "@/app/(app)/app/_components/ErrorIndicator/ErrorIndicator";

const RegisterForm: FC = () => {
    const [state, dispatch] = useActionState<HandleRegisterProfileReturnType, FormData>((_, form) => {
        return handleRegisterProfile(form)
    }, { error: '' })
    const { pending } = useFormStatus()
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <form action={dispatch}>
                <label htmlFor="name">Name</label>
                <Input id='name' name='name' />
                <ErrorIndicator error={state.validatedErrors?.name} />
                <button type="submit">Submit</button>
                {pending && <div>saving...</div>}
                <ErrorIndicator error={state.error} />
                {'success' in state && <div>Success</div>}
            </form>
        </div>
    );
}

export default RegisterForm