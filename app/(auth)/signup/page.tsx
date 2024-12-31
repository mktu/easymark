'use client'
import ValidationErrors from '../_components/ValidationErrors';
import { handleSignup, SigninState } from '../../../actions/auth/handleSignup';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Signup() {
    const [state, dispatch] = useFormState<SigninState, FormData>(handleSignup, { error: null })
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
                <Input
                    name='password'
                    type="password"
                    placeholder="Password"
                    required
                />
                <Button disabled={pending} type="submit">Sign Up</Button>
                <ValidationErrors state={state} />
            </form>
        </div>
    );
}
