'use server'
import { createClientForServer } from '@/lib/supabase/supabaseServer';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export type SigninState = {
    error: string | null,
} | {
    validatedErrors: {
        email?: string,
        password?: string
    }
} | {}

const schema = {
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
        message:
            'email address is invalid'
    }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" })
}

export const handleSignup = async (state: SigninState, formData: FormData) => {

    const validatedFields = z.object(schema).safeParse(Object.fromEntries(formData))

    if (!validatedFields.success) {
        return { validatedErrors: validatedFields.error.flatten().fieldErrors }
    }

    const email = validatedFields.data.email;
    const password = validatedFields.data.password;
    const supabase = await createClientForServer();
    const { error, data } = await supabase.auth.signUp({ email, password });
    if (error) {
        return { error }
    }
    if (!data.user) {
        throw new Error('User not authenticated')
    }
    redirect('/signup/verification')
};


