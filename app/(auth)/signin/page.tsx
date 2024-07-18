'use client'
import Link from 'next/link';
import { handleSignin, SigninState } from '../_actions/authHandler';
import { useFormState, useFormStatus } from 'react-dom';
import ValidationErrors from '../_components/ValidationErrors';

export default function Signin() {
    const [state, dispatch] = useFormState<SigninState, FormData>(handleSignin, { error: null })

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
                <input
                    name='password'
                    type="password"
                    placeholder="Password"
                    required
                />
                <button disabled={pending} type="submit">Sign In</button>
                <Link href="/signup">Sign Up</Link>
                <ValidationErrors state={state} />
            </form>
        </div>
    );
}
