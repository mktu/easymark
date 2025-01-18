'use server'
import { upsertUser } from "@/lib/repositories/profile";
import { uploadImage } from "@/lib/storage/profile";
import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { z } from "zod";

const schema = {
    name: z.string().min(1, { message: 'Name must be at least 1 character' }),
    image: z.instanceof(File, { message: 'Image must be a file' }).refine(value => value.size < 1000000, { message: 'Image must be less than 1MB' }).optional().nullable()
}

export const handleUpdateProfile = async (data: {
    name: string,
    image: File | null
}) => {

    const validated = z.object(schema).safeParse(data)
    if (!validated.success) {
        return { validatedErrors: validated.error.flatten().fieldErrors }
    }
    const { name, image } = validated.data
    const supabase = await createClientForServer();
    const { data: authData } = await supabase.auth.getUser()
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }

    let imageUrl: string | null = null

    if (image) {
        const ret = await uploadImage(image, authData.user.id, supabase)
        imageUrl = ret.imageUrl
    }

    try {
        await upsertUser(supabase, authData.user.id, name, imageUrl)
        return { success: true }
    } catch (e) {
        return { error: e }
    }
}

export type HandleUpdateProfileType = Awaited<ReturnType<typeof handleUpdateProfile>>;