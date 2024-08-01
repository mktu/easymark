import { NextRequest } from 'next/server'
import ogs from 'open-graph-scraper'

export type OgpResponse = {
    title: string
    description: string
    image: {
        url: string
        width: number
        height: number
        type: string
    } | null
    url: string
}


const doScrape = async (url: string) => {
    try {
        const { error, html, result, response } = await ogs({ url })
        if (error) {
            console.error(error)
            throw error
        }
        let image = result.ogImage ? result.ogImage[0] : null
        if (!image) {
            image = result.twitterImage ? result.twitterImage[0] : null
        }

        return {
            title: result.ogTitle,
            description: result.ogDescription,
            image,
            url: result.ogUrl
        } as OgpResponse
    } catch (e) {
        console.error(e)
        throw e
    }
}


export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url') as string
    const ret = await doScrape(url)
    return Response.json(ret)
}