'use client'
import { useActionState } from "react";
import Link from 'next/link';
import { useFormStatus } from 'react-dom';
import { handleGoogleSignin } from '@/actions/auth/handleGoogleSignin';
import { Button } from '@/components/ui/button';
import { handleSignin, HandleSigninReturnType } from '@/actions/auth/handleSignin';
import ErrorIndicator from "@/app/(app)/app/_components/ErrorIndicator/ErrorIndicator";
import { Input } from "@/components/ui/input";
import Image from "next/image";


export default function Signin() {
    const [state, dispatch] = useActionState<HandleSigninReturnType, FormData>((_, form) => {
        return handleSignin(form)
    }, { error: '' })

    const { pending } = useFormStatus()
    return (
        <div className="flex w-full flex-col items-center justify-center gap-4">
            <p className="mb-4 text-sm">初めての方は<Link className='font-semibold underline' href={'/signin'}>こちら</Link>から登録してください</p>
            <Image src='/images/signin.svg' width={200} height={200} alt='signin' />
            <form className='flex w-full flex-col items-center gap-4 p-4 md:w-[300px]' action={dispatch}>
                <Input
                    className="w-full"
                    name='email'
                    type="email"
                    placeholder="Email"
                    required
                />
                <ErrorIndicator error={state.validatedErrors?.email} />
                <Input
                    className="w-full "
                    name='password'
                    type="password"
                    placeholder="Password"
                    required
                />
                <ErrorIndicator error={state.validatedErrors?.password} />
                <Button className="w-full" disabled={pending} type="submit">Sign In</Button>
                <Button className="w-full items-center gap-0 rounded-sm shadow" variant='ghost' disabled={pending} type="button" onClick={() => {
                    handleGoogleSignin()
                }}>
                    <Image src='/images/google-signin.svg' width={40} height={40} alt='google-signin' />
                    <span className='inline-block font-semibold text-muted-foreground' style={{
                        fontFamily: 'Roboto'
                    }}>Sign in with Google</span>
                </Button>
                <ErrorIndicator error={state.error} />
            </form>


        </div>
    );
}
