'use client'
import { useActionState } from "react";
import Link from 'next/link';
import { useFormStatus } from 'react-dom';
import { handleGoogleSignin } from '@/actions/auth/handleGoogleSignin';
import { Button } from '@/components/ui/button';
import { handleSignin, HandleSigninReturnType } from '@/actions/auth/handleSignin';
import ErrorIndicator from "@/app/(app)/app/_components/ErrorIndicator/ErrorIndicator";

export default function Signin() {
    const [state, dispatch] = useActionState<HandleSigninReturnType, FormData>((_, form) => {
        return handleSignin(form)
    }, { error: '' })

    const { pending } = useFormStatus()
    return (
        <div>
            <h1>Sign In</h1>
            <form action={dispatch}>
                <input
                    name='email'
                    type="email"
                    placeholder="Email"
                    required
                />
                <ErrorIndicator error={state.validatedErrors?.email} />
                <input
                    name='password'
                    type="password"
                    placeholder="Password"
                    required
                />
                <ErrorIndicator error={state.validatedErrors?.password} />
                <Button disabled={pending} type="submit">Sign In</Button>
                <Link href="/signup">Sign Up</Link>
                <ErrorIndicator error={state.error} />
            </form>
            <Button disabled={pending} type="submit" onClick={() => {
                handleGoogleSignin()
            }}>Sign In with Google</Button>
        </div>
    );
}
