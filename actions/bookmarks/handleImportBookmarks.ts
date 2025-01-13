'use server'
import { ImportBookmarkType } from "@/hooks/import/useImport";
import { importBookmarks } from "@/lib/repositories/bookmarks";
import { addCategory, getCategoryByName } from "@/lib/repositories/categories";
import { addFailedBookmarkImport } from "@/lib/repositories/failed_bookmark_imports";
import { addImportStatus, updateImportStatus } from "@/lib/repositories/import_status";
import { importOgps } from "@/lib/repositories/ogps";
import { doScrape } from "@/lib/supabase/ogp";
import { Database } from "@/lib/supabase/schema";
import { createClientForServer } from "@/lib/supabase/supabaseServer";
import { SupabaseClient } from "@supabase/supabase-js";
import { waitUntil } from '@vercel/functions'

type ImportError = {
    url: string,
    cause: string
}

const batchImportBookmarks = async (supabase: SupabaseClient<Database>, userId: string, categoryId: number, targetBookmarks: ImportBookmarkType[]) => {
    const importErrors: ImportError[] = []
    const withOgps = await Promise.all(targetBookmarks.map(async (bookmark) => {
        const { title, url } = bookmark
        try {
            const ret = await doScrape(url)
            return {
                title: title || ret.title,
                url,
                description: ret.description,
                imageUrl: ret.image?.url
            }
        } catch (e) {
            console.error(e)
            importErrors.push({ url, cause: 'get-ogp' })
            return {
                title,
                url,
                description: '',
                imageUrl: ''
            }
        }
    }))
    const bookmarkResult = await importBookmarks(supabase, targetBookmarks.map(b => ({
        userId,
        url: b.url,
        categoryId
    })))
    if (bookmarkResult.error) {
        targetBookmarks.map(b => importErrors.push({ url: b.url, cause: bookmarkResult.dupplicate ? 'save-bookmark-dupplicate' : 'save-bookmark' }))
        return { error: bookmarkResult.error, importErrors }
    }
    if (bookmarkResult.failedUrls && bookmarkResult.failedUrls.length > 0) {
        bookmarkResult.failedUrls.map(url => importErrors.push({ url, cause: 'save-bookmark' }))
    }
    const ogpResult = await importOgps(supabase, withOgps)
    if (ogpResult.error) {
        withOgps.map(b => importErrors.push({ url: b.url, cause: 'save-ogp' }))
        return { error: ogpResult.error, importErrors }
    }
    if (ogpResult.failedUrls && ogpResult.failedUrls.length > 0) {
        ogpResult.failedUrls.map(url => importErrors.push({ url, cause: 'save-ogp' }))
    }

    return { success: true, importErrors }
}

const BatchSize = 10

const importBookmarksTask = async (
    supabase: SupabaseClient<Database>,
    userId: string,
    targetBookmarks: ImportBookmarkType[],
    statusId: number) => {
    const importErrors: ImportError[] = []
    let category = (await getCategoryByName(supabase, userId, 'Imported'))?.categoryId;
    if (!category) {
        const { categoryId } = await addCategory(supabase, {
            userId,
            name: 'Imported',
            color: '#103040'
        })
        if (categoryId) {
            category = categoryId;
        } else {
            return { error: 'cannot create category' }
        }
    }
    for (let i = 0; i < targetBookmarks.length; i += BatchSize) {
        const batch = targetBookmarks.slice(i, i + BatchSize);

        const result = await batchImportBookmarks(supabase, userId, category, batch);
        const processedCount = i + BatchSize > targetBookmarks.length ? targetBookmarks.length : i + BatchSize
        await updateImportStatus(supabase, {
            userId,
            status: 'processing',
            progress: Math.round(1.0 * processedCount / targetBookmarks.length * 100),
            completedItems: processedCount,
        })
        importErrors.push(...result.importErrors)
    }
    if (importErrors.length > 0) {
        await addFailedBookmarkImport(supabase, {
            statusId,
            userId,
            importErrors
        })
    }
}

export const handleImportBookmarks = async (targetBookmarks: ImportBookmarkType[]) => {
    const supabase = createClientForServer()
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
        return { error: 'not authenticated' }
    }
    const statusId = await addImportStatus(supabase, {
        userId: authData.user.id,
        totalItems: targetBookmarks.length
    })

    waitUntil(new Promise(() => {
        importBookmarksTask(supabase, authData.user.id, targetBookmarks, statusId)
    }))

    return statusId
}

export type HandleImportBookmarksResultType = Awaited<ReturnType<typeof handleImportBookmarks>>;