'use client'
import ValidationErrors from '../_components/ValidationErrors';
import { handleSignup, SigninState } from '../_actions/authHandler';
import { useFormState, useFormStatus } from 'react-dom';

export default function Signup() {
    const [state, dispatch] = useFormState<SigninState, FormData>(handleSignup, { error: null })
    const { pending } = useFormStatus()
    return (
        <div>
            <h1>Sign Up</h1>
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
                <button disabled={pending} type="submit">Sign Up</button>
                <ValidationErrors state={state} />
            </form>
        </div>
    );
}
