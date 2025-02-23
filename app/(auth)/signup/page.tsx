'use client'
import { useActionState } from "react";
import { handleSignup, HandleSignupReturnType } from '../../../actions/auth/handleSignup';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ErrorIndicator from "@/app/(app)/app/_components/ErrorIndicator/ErrorIndicator";
import Link from "next/link";
import Image from "next/image";

export default function Signup() {
    const [state, dispatch] = useActionState<HandleSignupReturnType, FormData>((_, form) => {
        return handleSignup(form)
    }, { error: '' })
    const { pending } = useFormStatus()
    return (
        <div className="flex w-full flex-col items-center justify-center gap-4">
            <p className="mb-4 text-sm">既に登録済みの方は<Link className='font-semibold underline' href={'/signin'}>ログイン</Link>してください</p>
            <Image src='/images/signin.svg' width={200} height={200} alt='signin' />
            <form action={dispatch} className='flex w-full flex-col items-center gap-4 p-4'>
                <Input
                    className="w-full md:w-[300px]"
                    name='email'
                    type="email"
                    placeholder="Email"
                    required
                />
                <ErrorIndicator error={state.validatedErrors?.email} />
                <Input
                    className="w-full md:w-[300px]"
                    name='password'
                    type="password"
                    placeholder="Password"
                    required
                />
                <ErrorIndicator error={state.validatedErrors?.password} />
                <Button className="w-full md:w-[300px]" disabled={pending} type="submit">Sign Up</Button>
                <ErrorIndicator error={state.error} />
            </form>
        </div>
    );
}
