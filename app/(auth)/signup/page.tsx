'use client'
import { useActionState } from "react";
import { handleSignup, HandleSignupReturnType } from '../../../actions/auth/handleSignup';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ErrorIndicator from "@/app/(app)/app/_components/ErrorIndicator/ErrorIndicator";

export default function Signup() {
    const [state, dispatch] = useActionState<HandleSignupReturnType, FormData>((_, form) => {
        return handleSignup(form)
    }, { error: '' })
    const { pending } = useFormStatus()
    return (
        <div>
            <h1>Sign Up</h1>
            <form action={dispatch}>
                <Input
                    name='email'
                    type="email"
                    placeholder="Email"
                    required
                />
                <ErrorIndicator error={state.validatedErrors?.email} />
                <Input
                    name='password'
                    type="password"
                    placeholder="Password"
                    required
                />
                <ErrorIndicator error={state.validatedErrors?.password} />
                <Button disabled={pending} type="submit">Sign Up</Button>
                <ErrorIndicator error={state.error} />
            </form>
        </div>
    );
}
