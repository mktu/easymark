'use server'
import { uploadImage } from "@/lib/storage/profile"
import { createClientForServer } from "@/lib/supabase/supabaseServer"
import { redirect } from "next/navigation"
import { z } from "zod"

const schema = {
    name: z.string(),
    image: z.instanceof(File, { message: 'Image must be a file' }).refine(value => value.size < 1000000, { message: 'Image must be less than 1MB' }).optional()
}

const parseParameters = async (formData: FormData) => {
    const validatedFields = z.object(schema).safeParse(Object.fromEntries(formData))

    if (!validatedFields.success) {
        return { validatedErrors: validatedFields.error.flatten().fieldErrors }
    }

    const name = validatedFields.data.name;
    const image = validatedFields.data.image;
    return { name, image }
}




const handleUpsert = async (formData: FormData) => {
    const supabase = await createClientForServer();
    const { data: authData } = await supabase.auth.getUser()
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }
    const { name, image, validatedErrors } = await parseParameters(formData)
    if (validatedErrors) {
        return { validatedErrors }
    }

    if (image) {
        const imageUrl = await uploadImage(image, authData.user.id, supabase)
        const { error: updateError } = await supabase.from('users').upsert({
            id: authData.user.id,
            username: name,
            image: imageUrl
        })
        console.error(updateError)
        return updateError ? {
            error: 'Failed to update profile'
        } : {
            success: true
        }
    }
    const { error: updateError } = await supabase.from('users').upsert({
        id: authData.user.id,
        username: name
    })
    return updateError ? {
        error: 'Failed to update profile'
    } : { success: true }
}

export const handleRegisterProfile = async (formData: FormData) => {
    const ret = await handleUpsert(formData)
    if ('error' in ret) {
        return { error: ret.error }
    }
    if ('validatedErrors' in ret) {
        return { validatedErrors: ret.validatedErrors }
    }
    redirect('/app/')
};

export type HandleRegisterProfileReturnType = Awaited<ReturnType<typeof handleRegisterProfile>>;