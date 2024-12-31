import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { redirect } from "next/navigation";
import { z } from "zod";

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

export const handleSignin = async (state: SigninState, formData: FormData) => {

    const validatedFields = z.object(schema).safeParse(Object.fromEntries(formData))

    if (!validatedFields.success) {
        return { validatedErrors: validatedFields.error.flatten().fieldErrors }
    }

    const email = validatedFields.data.email;
    const password = validatedFields.data.password;
    const supabase = createClientForServer();
    const { error, data } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        return { error: error.message }
    }
    const res = await supabase.from('users').select('*').eq('id', data.user.id)
    if (res.error) {
        console.error(res.error)
        throw new Error('Failed to load user')
    }
    if (res.data?.length === 0) {
        redirect('/register')
    }
    redirect('/app')
};