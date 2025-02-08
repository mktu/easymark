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


export const doScrape = async (url: string) => {
    try {
        const { error, result } = await ogs({ url })
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